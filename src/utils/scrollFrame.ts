type ScrollFrameTask<T = unknown> = {
  read: () => T;
  write: (snapshot: T) => void;
};

const tasks = new Set<ScrollFrameTask>();
let rafId = 0;
let sourceBound = false;

type LenisLike = {
  on: (event: 'scroll', callback: () => void) => void;
};

type LenisWindow = Window & {
  __leoLenis?: LenisLike;
};

function getLeoLenis(): LenisLike | undefined {
  return (window as LenisWindow).__leoLenis;
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

  const bindLenis = (lenis: LenisLike): void => {
    window.removeEventListener('scroll', scheduleScrollFrame);
    lenis.on('scroll', scheduleScrollFrame);
    scheduleScrollFrame();
  };

  const lenis = getLeoLenis();
  if (lenis) {
    bindLenis(lenis);
    return;
  }

  window.addEventListener('leo:lenis-ready', (event) => {
    const readyEvent = event as CustomEvent<LenisLike>;
    bindLenis(readyEvent.detail);
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
