//module.exports = {    //两种方式都可以
export default {
  proEleType(val) {
    if (val.indexOf('PM25') > -1) {
      val = val.replace('PM25', 'PM<sub>2.5</sub>');
    } else if (val.indexOf('PM2.5') > -1) {
      val = val.replace('PM2.5', 'PM<sub>2.5</sub>');
    } else if (val.indexOf('PM10') > -1) {
      val = val.replace('PM10', 'PM<sub>10</sub>');
    } else if (val.indexOf('PM1') > -1) {
      val = val.replace('PM1', 'PM<sub>1</sub>');
    } else if (val.indexOf('O3') > -1) {
      val = val.replace('O3', 'O₃');
    } else if (val.indexOf('NO2') > -1) {
      val = val.replace('NO2', 'NO₂');
    } else if (val.indexOf('SO2') > -1) {
      val = val.replace('SO2', 'SO₂');
    } else if (val.indexOf('CO2') > -1) {
      val = val.replace('CO2', 'CO₂');
    }
    return val;
  },
  EleUpperToLower(type) {
    type = type.replace(/O₃/g, 'O3').replace(/NO₂/g, 'NO2').replace(/SO₂/g, 'SO2').replace(/CO₂/g, 'CO2')
      .replace(/PM<sub>2.5<\/sub>/g, 'PM25').replace(/PM<sub>10<\/sub>/g, 'PM10').replace(/PM<sub>1<\/sub>/g, 'PM1');
    return type;
  },
  //用户管理table表格的搜索
  search(originData, inputKey, excludeField,activeTxt,inactiveTxt) {
    let tableData = [];
    if (!inputKey) {
      tableData = originData;
      return tableData;
    };
    originData.forEach(ele => {
      for (const key in ele) {
        let flag = true;
        for (let j = 0; j < excludeField.length; j++) {
          if (key == excludeField[j]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          let val = ele[key];
          if (key == 'status') {
            val = val == true ? activeTxt : inactiveTxt;
          }
          if (val.toString().indexOf(inputKey) > -1) {
            tableData.push(ele);
            break;
          }
        }
      }
    });
    return tableData;
  }

}
