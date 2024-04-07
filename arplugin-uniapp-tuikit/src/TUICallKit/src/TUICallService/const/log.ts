/* eslint-disable */
// 唯一一个变量格式有问题的, 但是为了和原来 TUICallKit 对外暴露的保持一致
export enum LOG_LEVEL {
  NORMAL = 0, // 普通级别，日志量较多，接入时建议使用
  RELEASE = 1, // release级别，SDK 输出关键信息，生产环境时建议使用
  WARNING = 2, // 告警级别，SDK 只输出告警和错误级别的日志
  ERROR = 3, // 错误级别，SDK 只输出错误级别的日志
  NONE = 4, // 无日志级别，SDK 将不打印任何日志
}
