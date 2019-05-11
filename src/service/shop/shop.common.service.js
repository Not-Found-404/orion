import {AbstractService} from "../abstract.service";

export class ShopCommonService extends AbstractService {
    /**
     * 店铺分页
     */
    shopPaging = (request) => {
        this.get({
            url: '/api/common/shop/paging',
            request: request
        })
    };

  /**
   * 根据id查看店铺详情
   * @param request
   */
  commonShopGet = (request) => {
    this.get({
      url: '/api/common/shop/get',
      request: request
    })
  };

    /**
     * 店铺前台类目查看
     * @param request
     */
    shopCategoryLis = (request) => {
        this.get({
            url: '/api/common/shop/category/list',
            request: request
        })
    }
}
