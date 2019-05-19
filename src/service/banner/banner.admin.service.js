import {BannerCommonService} from "./banner.common.service";

export class BannerAdminService extends BannerCommonService {
  /**
   * 创建广告图
   * @param request 参数
   */
  create = (request) => {
    console.log('创建广告图');
    this.post({
      url: '/api/admin/banner/create',
      request: request
    });
  };

  /**
   * 广告图list
   * @param request 参数
   */
  adminList = (request) => {
    console.log('广告图list');
    this.get({
      url: '/api/admin/banner/list',
      request: request
    });
  };

  /**
   * 禁用/启用广告图
   * @param request 参数
   */
  enbaleStatus = (request) => {
    console.log('禁用/启用广告图');
    this.post({
      url: '/api/admin/banner/enable',
      request: request
    });
  };

  /**
   * 删除广告图
   * @param request 参数
   */
  detele = (request) => {
    console.log('删除广告图');
    this.post({
      url: '/api/admin/banner/remove',
      request: request
    });
  };

  /**
   * 更新广告图
   * @param request 参数
   */
  update = (request) => {
    console.log('更新广告图');
    this.post({
      url: '/api/admin/banner/update',
      request: request
    });
  };
}
