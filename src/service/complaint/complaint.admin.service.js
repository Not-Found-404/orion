import {ComplaintCommonService} from "./complaint.common.service";


export class ComplaintAdminService extends ComplaintCommonService {

  /**
   * 投诉分页
   * @param request
   */
  paging = (request)=>{
    console.log('投诉分页');
    this.get({
      url: '/api/admin/complaint/paging',
      request: request
    });
  }
}
