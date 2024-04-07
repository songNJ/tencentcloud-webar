import { onMounted, onUnmounted, unref } from '../../../../../../adapter-vue';
import { useListenEvent } from './useListenerEvent';

export function useOnClickOutSide(targetEls: any[], handler: () => any) {
  let stop = () => {};

  onMounted(() => {
    const listener = (event: Event) => {
      const targets = targetEls.map(targetEl => unref(targetEl));
      const paths = event.composedPath();
      const rs = [];

      for (let i = 0; i < targets.length; i++) {
        rs[i] = paths.includes(targets[i]);
      }

      if (rs.every(item => !item)) {
        handler();
      }
    };
    stop = useListenEvent('click', listener, { passive: true });
  });

  onUnmounted(() => {
    stop?.();
  });
}
