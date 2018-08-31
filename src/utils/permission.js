//暂时这样没时间做，以后要从后台读取
export function fetchPermission(entityName) {
  if (entityName === "" || entityName == null) {
    return topPermissioin;
  } else {
    return sidePermission;
  }
}
var topPermissioin = [{
      name: '首页',
      entityName: 'home'
    },
    {
      name: '数据服务',
      entityName: 'dataService'
    },
    {
      name: '在线展示',
      entityName: 'display'
    },
    {
      name: '开放指数',
      entityName: 'statistics'
    },
    {
      name: '相关成果',
      entityName: 'relateResults'
    },
    {
      name: '用户支持',
      entityName: 'userSupport'
    },
    {
      name: '关于我们',
      entityName: 'about'
    }
  ];

