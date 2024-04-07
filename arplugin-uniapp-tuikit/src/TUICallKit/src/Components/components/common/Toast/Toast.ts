import { VNode, createVNode, render } from '../../../../adapter-vue';
// @ts-ignore
import ToastVue from './Toast.vue';
import { CreateToast, TToast, TToastOptions, ToastType } from './type';

const Toast: TToast = {};
const instances: VNode[] = [];
let seed = 1;

function getLastTop() {
  const len = instances.length;
  return len > 0 ? instances[len - 1]?.el?.style?.top : '30px';
}
function getLastOffsetHeight() {
  const len = instances.length;
  return len > 0 ? instances[len - 1]?.el?.offsetHeight : 0;
}

export const createToast: CreateToast = (options) => {
  const { type, duration = 3000, message, showClose = false, onClose } = options; // eslint-disable-line
  const appendTo = document.body;
  const container = document.createElement('div');
  const vnode = createVNode(ToastVue, {
    type,
    duration,
    message,
    showClose,
    index: `toast-item-${seed++}`, // eslint-disable-line
    close() {
      const index = instances.findIndex(item =>  item === vnode);
      console.log(instances[index]?.el?.offsetHeight);
      const removeHeight = parseInt(instances[index]?.el?.offsetHeight) + 20; // eslint-disable-line
      for (let i = 0; i < instances.length; i++) {
        if (i < index) {
          continue;
        } else {
          // @ts-ignore
          instances[i].el.style.top = parseInt(instances[i].el.style.top) - removeHeight + 'px'; // eslint-disable-line
        }
      }
      instances.splice(index, 1);
    },
    destroy() {
      render(null, container);
    },
  });
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild!);

  const lastTop = getLastTop();
  const lastOffsetHeight = getLastOffsetHeight();

  // @ts-ignore
  vnode.el.style.top = parseInt(lastTop) + parseInt(lastOffsetHeight) + 20 + 'px'; // eslint-disable-line
  instances.push(vnode);
};

(['info', 'waring', 'error', 'success'] as ToastType[]).forEach((type) => {
  let params: any = {};
  Toast[type] = (options: TToastOptions | string) => {
    if (typeof options === 'string') {
      params.message = options;
    } else {
      params = options;
    }

    createToast({ type, ...params });
  };
});

Toast.show = (options: TToastOptions) => {
  let params: any = {};
  if (typeof options === 'string') {
    params.message = options;
    params.type = 'info';
  } else {
    params = options;
  }
  return createToast({ type: 'info', ...params });
};

export {
  Toast,
};
