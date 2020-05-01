export class ConfigConst {
  static readonly API_VERSION = '0.0.1';
  static readonly MSG_HEALTH = 'Api is Ok!';

  // URLs
  static readonly TRADEMARK_URL = '/trademarks/';
  static readonly PROGRAM_URL = '/programs/';
  static readonly EDU_MODULE_PATH = '/edu-modules/';
  static readonly EDUCATIONAL_PATH_URL = '/educational-paths/';
  static readonly CATEGORY_URL = '/categories/';

  // Redis Keys
  static readonly EDUCATIONAL_PATHS_REDIS_KEY = 'educational-paths';
  static readonly EDU_PATH_MODULES_REDIS_KEY = 'edu-path-modules';
}
