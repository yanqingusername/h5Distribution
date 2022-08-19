import { 
    get
} from './http'

import requestH5Imgs from './requestH5Img'
import requestH5Other from './requestH5Other'


export const udateH5Images = val => requestH5Imgs('', val, 'post');

export const getJSSDKHELP = val => requestH5Other('/conveyLogin/JSSDKHELP.hn', val, 'get'); // 调用扫一扫

export const getLogin = val => requestH5Other('/conveyLogin/login.hn', val, 'get'); // 登录

export const getAutoLogin = val => requestH5Other('/conveyLogin/autoLogin.hn', val, 'get'); // 判断是否可以自动登录
// http://lisalarm.coyotebio-lab.com/lis_alarm/conveyLogin/autoLogin.hn?code=

export const getConveyList = val => requestH5Other('/conveyLogin/getConveyList.hn', val, 'get'); // 获取转运信息列表

export const conveyScan = val => requestH5Other('/conveyLogin/conveyScan.hn', val, 'get'); // // 转运员扫箱码操作

export const getCheckedUserId = val => requestH5Other('/conveyLogin/isDelete.hn', val, 'get'); // // 转运员账号检测


export const checkboxnum = val => requestH5Other('/conveyLogin/checkboxnum.hn', val, 'get'); // // 检测箱码


export const getChannelList = val => requestH5Other('/conveyLogin/channellist.hn', val, 'get'); // // 采样点列表


export const submitDRboxnum = val => requestH5Other('/conveyLogin/submitDRboxnum.hn', val, 'get'); // // 东软箱码,试管,采样点提交



