/* eslint-disable operator-linebreak */
export namespace Constant {
  // <START> NOTIFICATIONS

  // Banner Notifications
  export const NOTIFICATION_TITLE_NEW_BANNER = 'New Banner Community'
  export const NOTIFICATION_BODY_NEW_BANNER = 'New Banner Community %s'

  // Community Noifications
  export const NOTIFICATION_TITLE_NEW_COMMUNITY = 'New Community'
  export const NOTIFICATION_BODY_NEW_COMMUNITY = 'New Community %s'
  export const NOTIFICATION_TITLE_APPROVE_COMMUNITY_MEMBER = 'Join Community Approved'
  export const NOTIFICATION_BODY_APPROVE_COMMUNITY_MEMBER = 'Your request join has been approved'

  // Sub Community Notifications
  export const NOTIFICATION_TITLE_NEW_SUB_COMMUNITY = 'New Sub Community'
  export const NOTIFICATION_BODY_NEW_SUB_COMMUNITY = 'New Sub Community %s'
  export const NOTIFICATION_TITLE_APPROVE_SUB_COMMUNITY_MEMBER = 'Join Sub Community Approved'
  export const NOTIFICATION_BODY_APPROVE_SUB_COMMUNITY_MEMBER =
    'Your request join has been approved'

  // Thread Notifications
  export const NOTIFICATION_TITLE_NEW_THREAD = 'New Thread'
  export const NOTIFICATION_BODY_NEW_THREAD = 'New Thread %s'
  export const NOTIFICATION_TITLE_COMMENT_THREAD = 'Thread Comment'
  export const NOTIFICATION_BODY_COMMENT_THREAD = '%s commented your thread'
  export const NOTIFICATION_TITLE_LIKE_THREAD = 'Thread Like'
  export const NOTIFICATION_BODY_LIKE_THREAD = '%s liked your thread'
  export const NOTIFICATION_TITLE_COMMENT_LIKE_THREAD = 'Thread Comment Like'
  export const NOTIFICATION_BODY_COMMENT_LIKE_THREAD = '%s like your comment'

  // <END> NOTIFICATIONS

  export const LOG_KEY = 'logs'
  export const LOG_CACHE_EXP = 1000 * 60 * 60 * 24 * 2 // 3 days
  export const APP_NAME = 'Sokrates Community'
  export const ERR_APP = 'errors'
  export const ERR_INTERNAL = 'internal server error, err: '
  export const ERR_AUTH_SERVICE = 'third party error on auth service, err: '
  export const ERR_SUPERAPPS_SERVICE = 'third party error on superapps service, err: '
  export const ERR_COMMUNITY_SERVICE = 'third party error on community service, err: '
  export const ERR_SOKRATES_SERVICE = 'third party error on sokrates service, err: '
  export const ERR_SOKRATES_SYSTEM_SERVICE = 'third party error on sokrates system service, err: '
  export const ERR_AWS = 'aws server error, err: '
  export const ERR_FILE_NOT_EXISTS = 'file not exists'
  export const ERR_SESSION_USER_NOT_FOUND = 'session user not found'
  export const ERR_STATUS_NOT_FOUND = 'status not found'
  export const ERR_USER_FORBIDDEN = 'user forbidden to access'
}
