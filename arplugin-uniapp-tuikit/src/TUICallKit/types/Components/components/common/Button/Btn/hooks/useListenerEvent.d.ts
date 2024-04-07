/**
* @function 给目标元素添加事件监听
* @description 给目标元素添加事件监听
* @param {HTMLElement} 需要监听的元素,，为空默认window.document
* @param {String} 事件名
* @param {Function} 回调函数
* @param {Object} 监听事件的选项，同addEventListener的options参数
* @return {void} 返回停止监听的函数
* @example
*   useListenEvent(btnEl, 'click', () => { console.log('click btn');});
*/
export declare function useListenEvent(event: string, handler: Function, options: object): () => any;
export declare function useListenEvent(target: HTMLElement, event: string, handler: Function, options: object): () => any;
