type ScrollFrameTask<T = unknown> = {
  read: () => T;
  write: (snapshot: T) => void;
};

const tasks = new Set<ScrollFrameTask>();
let rafId = 0;
let sourceBound = false;

type LenisWindow = Window & {
  __leoLenis?: unknown;
};

function hasLeoLenis(): boolean {
  return Boolean((window as LenisWindow).__leoLenis);
}

export function scheduleScrollFrame(): void {
  if (rafId) return;

  rafId = requestAnimationFrame(() => {
    rafId = 0;
    const frameTasks = Array.from(tasks);
    const snapshots = frameTasks.map((task) => task.read());

    frameTasks.forEach((task, index) => {
      task.write(snapshots[index]);
    });
  });
}

function bindScrollSource(): void {
  if (sourceBound) return;
  sourceBound = true;

  if (hasLeoLenis()) {
    window.removeEventListener('scroll', scheduleScrollFrame);
    return;
  }

  window.addEventListener('leo:lenis-ready', () => {
    window.removeEventListener('scroll', scheduleScrollFrame);
    scheduleScrollFrame();
  }, { once: true });
  window.addEventListener('scroll', scheduleScrollFrame, { passive: true });
}

export function registerScrollFrame<T>(
  task: ScrollFrameTask<T>,
  options: { immediate?: boolean } = {},
): () => void {
  bindScrollSource();
  tasks.add(task as ScrollFrameTask);

  if (options.immediate) {
    scheduleScrollFrame();
  }

  return () => {
    tasks.delete(task as ScrollFrameTask);
  };
}
