import { 
    get
} from './http'

import requestH5Imgs from './requestH5Img'
import requestH5Other from './requestH5Other'


export const udateH5Images = val => requestH5Imgs('', val, 'post');

export const getJSSDKHELP = val => requestH5Other('/convey/JSSDKHELP.hn', val, 'get'); // 调用扫一扫

export const getLogin = val => requestH5Other('/convey/login.hn', val, 'get'); // 登录

export const getAutoLogin = val => requestH5Other('/convey/autoLogin.hn', val, 'get'); // 判断是否可以自动登录

export const getConveyList = val => requestH5Other('/convey/getConveyList.hn', val, 'get'); // 获取转运信息列表

export const conveyScan = val => requestH5Other('/convey/conveyScan.hn', val, 'get'); // // 转运员扫箱码操作




