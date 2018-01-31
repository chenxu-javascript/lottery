var lottery_initial_datas =[
    {
        "nameen": "avatar1",
        "namezh": "臧久龙",
        "wish": "2018年要发！目标5个亿！"
        },
        {
        "nameen": "avatar2",
        "namezh": "符江川",
        "wish": "“京鹏展翅，一飞冲天”， 祝大家在新年身体健康，阖家辛福。公司经过一年的艰苦奋斗"+
         "预计2018年一定会结出胜利的果实, 公司全体伙伴也必将共同成长，走向成功。"
        },
        {
        "nameen": "avatar3",
        "namezh": "赵永刚",
        "wish": "祝北京新鸥鹏2018财旺、运旺、事业辉煌!"
        },
        {
        "nameen": "avatar4",
        "namezh": "王展",
        "wish": "2017我们，汇聚一堂，并肩作战有过彷徨，但未迷茫2018我们，蓄势待发，阔步前行，团结一心，点石成金"
        },
        {
        "nameen": "avatar5",
        "namezh": "田浩",
        "wish": "祝大家2018年身体健康，万事如意，多多拿地，销售额过200亿"
        },
        {
        "nameen": "avatar6",
        "namezh": "龚伟",
        "wish": "北京公司开创辉煌"
        },
        {
        "nameen": "avatar7",
        "namezh": "张京胫",
        "wish": "祝：新鸥鹏公司新年快乐；愿鹏程万里，再创辉煌！"
        },
        {
        "nameen": "avatar8",
        "namezh": "刘洁",
        "wish": "新年快乐，祝2018年北京新鸥鹏大展宏图，狗年大吉。"
        },
        {
        "nameen": "avatar9",
        "namezh": "何小飞",
        "wish": "新年快乐，祝2018年北京新鸥鹏大展宏图，狗年大吉。"
        },
        {
        "nameen": "avatar10",
        "namezh": "韩雪",
        "wish": "祝北京新鸥鹏迈上新的征程，开创新的辉煌。"
        },
        {
        "nameen": "avatar11",
        "namezh": "申祝嘉",
        "wish": "祝北京新鸥鹏在2018披荆斩棘，一飞冲天"
        },
        {
        "nameen": "avatar12",
        "namezh": "林俊程",
        "wish": "祝新鸥鹏新年新气象，鹏程万里！！！"
        },
        {
        "nameen": "avatar13",
        "namezh": "王树春",
        "wish": "在新的一年，祝公司财运滚滚，事业旺旺，祝大家身体棒棒的"
        }
];


// 奖品个数
var award_config = {
    "award00": 1,
    "award01": 1,
    "award02": 2,
    "award03": 3,
    "award04": 6
};

// 初始化数据
if (!localStorage.getItem('lottery_initial')) {
    var data_str = JSON.stringify(lottery_initial_datas);
    localStorage.setItem('lottery_initial', data_str);
}
if (!localStorage.getItem('award_initial')) {
    var award_str = JSON.stringify(award_config);
    localStorage.setItem('award_initial', award_str);
}
