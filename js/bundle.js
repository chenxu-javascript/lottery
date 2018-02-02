'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var stopLottery = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var moveDom, stop_top, left_height, left_distance, end_top, sure_index, lastStep, award, lottery_name_zh, lottery_name_en, top, time02, stop_time, local_award, award_tmp, award_datas;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        moveDom = document.getElementById('lottery-wrap');

                        if (!isLock) {
                            _context.next = 4;
                            break;
                        }

                        console.log('还没结束，请稍等...');
                        return _context.abrupt('return');

                    case 4:
                        _context.next = 6;
                        return bsCheck(function () {
                            $('#lottery-wrap').css('top') == 20;
                        });

                    case 6:
                        isStart = false;
                        isMove = false;
                        speed = 3;
                        debugger;
                        stop_top = $('#lottery-wrap').css('top');

                        stop_top = Math.abs(parseInt(stop_top));
                        left_height = item_outer_height - stop_top % item_outer_height;
                        left_distance = left_height + left_center_top;
                        end_top = stop_top + left_distance;
                        sure_index = Math.floor((end_top + item_height % 2) / item_height) + 1;

                        console.log(sure_index);

                        lastStep = function lastStep() {
                            time02 = nextFrame(function () {
                                top -= 8;
                                moveDom.style.top = -stop_top + top + 'px';
                                if (-top <= left_distance) {
                                    lastStep();
                                } else {
                                    cancelFrame(time02);

                                    $('#lottery-wrap .lottery-list').eq(sure_index).addClass('sure-active');
                                    var award_tpl = $('#awardcon-tpl').html();
                                    var award_dom = substitute(award_tpl, award_tmp);
                                    $('#award-0' + award).show();
                                    if (award == 4) {
                                        $('#award-123').hide();
                                        $('#award-04').show();
                                        $('#award04-toggle').css('display', 'inline-block');
                                    }
                                    $('#award-0' + award + ' .win').append(award_dom);
                                }
                            });
                        };

                        lastStep();

                        cancelFrame(timer);

                        award = $('#lottery-btn').data('award');
                        lottery_name_zh = $('#lottery-wrap .lottery-list').eq(sure_index).data('namezh');
                        lottery_name_en = $('#lottery-wrap .lottery-list').eq(sure_index).data('nameen');
                        top = 0;
                        time02 = null;

                        $('.stop-main').fadeIn();
                        stop_time = setTimeout(function () {
                            $('#stop-time').fadeIn();
                            $('#stop-time').text('贰');
                            $('#stop-time').fadeOut();
                        }, 1000);

                        stop_time = setTimeout(function () {
                            $('#stop-time').fadeIn();
                            $('#stop-time').text('壹');
                        }, 2000);
                        stop_time = setTimeout(function () {
                            $('#stop-time').fadeOut();
                            clearTimeout(stop_time);
                            $('.stop-main').hide();
                        }, 2500);

                        local_award = local_handle.get('award_' + award);
                        award_tmp = null;

                        if (local_award) {
                            award_datas = JSON.parse(local_award);

                            award_tmp = {
                                'nameen': lottery_name_en,
                                'namezh': lottery_name_zh
                            };
                            award_datas.push(award_tmp);
                            local_handle.set("award_" + award, JSON.stringify(award_datas));
                        } else {
                            award_datas = [];

                            award_tmp = {
                                'nameen': lottery_name_en,
                                'namezh': lottery_name_zh
                            };
                            award_datas.push(award_tmp);
                            local_handle.set("award_" + award, JSON.stringify(award_datas));
                        }

                        local_handle.set("award_history", award);

                        local_handle.delete(lottery_datas, lottery_name_en);

                        award_log['award0' + award] -= 1;
                        local_handle.set('award_log', JSON.stringify(award_log));

                        drawAward(award, lottery_name_zh, lottery_name_en);

                        $('#lottery-wrap').html($('#lottery-wrap').html() + $('#lottery-wrap').html());

                        setTimeout(function () {
                            $('#lottery-result').modal('show');
                            drawAward(award, lottery_name_zh, lottery_name_en);

                            can_stop = true;
                            clearTimeout(arguments.callee);
                        }, 4200);

                    case 39:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function stopLottery() {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Handlebars = require('handlebars');
var lotteryList = [{ 'name': '特等奖', 'num': 1, 'price': '人民币 ¥ 4800.00' }, { 'name': '一等奖', 'num': 1, 'price': '人民币 ¥ 2800.00' }, { 'name': '二等奖', 'num': 2, 'price': '人民币 ¥ 1800.00' }, { 'name': '三等奖', 'num': 3, 'price': '人民币 ¥ 800.00' }, { 'name': '幸运奖', 'num': 6, 'price': '人民币 ¥ 400.00' }];
$('#aside-body').html(_.template($('#gift-tpl').html(), lotteryList));

if (!window.localStorage) {
    alert('不支持localstorage，抽奖无法启动！');
}

var local_handle = {
    local_item: "lottery_datas",
    get: function get(key) {
        return window.localStorage.getItem(key) || '';
    },

    set: function set(key, val) {
        window.localStorage.setItem(key, val);
    },
    delete: function _delete(datas, name) {
        var res = [];
        datas.forEach(function (val, index) {
            if (name != val.nameen) {
                res.push(val);
            }
        });
        var new_datas = JSON.stringify(res);
        this.set(this.local_item, new_datas);
        return res;
    },
    clear: function clear() {
        window.localStorage.clear();
    }
};

var award_log = null;
if (!local_handle.get("award_log")) {
    var award_log = window.localStorage.getItem('award_initial');
    award_log = JSON.parse(award_log);
} else {
    var award_log = window.localStorage.getItem('award_log');
    award_log = JSON.parse(award_log);
}

if (!local_handle.get("lottery_datas")) {
    var lottery_storage = window.localStorage.getItem('lottery_initial');
} else {
    var lottery_storage = window.localStorage.getItem('lottery_datas');
}
var lottery_datas = JSON.parse(lottery_storage);
$('#lottery-wrap').html(_.template($('#lotterycon-tpl').html(), lottery_datas));

function getAward() {
    var array = [1, 2, 3, 4];
    array.forEach(function (o, k) {
        if (local_handle.get('award_' + o)) {
            $('#award-0' + o).show();
            var award1_storage = window.localStorage.getItem('award_' + o);
            var award1_datas = JSON.parse(award1_storage);
            award1_datas.forEach(function (val, key) {
                var award_tpl = $('#awardcon-tpl').html();
                var template = Handlebars.compile(source);
                var award_dom = template(award_tpl);
                debugger;
                var award_dom = substitute(award_tpl, val);
                $('#award-0' + o + ' .win').append(award_dom);
            });
            if (k == array.length - 1) {
                $('#award04-toggle').css('display', 'inline-block');
            }
        };
    });
}

var nextFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    var currTime = +new Date(),
        delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
    lastTime = currTime + delay;
    return setTimeout(callback, delay);
},
    cancelFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout,
    speed = 2,
    item_outer_height = $('.lottery-list:eq(1)').outerHeight(true),
    item_height = $('.lottery-list:eq(1)').outerHeight(),
    left_center_top = item_height / 2 - 20,
    lottery_btn = $('#lottery-btn'),
    isMove = true,
    isStart = false,
    isLock = true,
    can_stop = false,
    timer = null,
    setout_time = null;

function justGo(isMove) {
    var moveDom = document.getElementById('lottery-wrap'),
        wrapDom = document.getElementById('lottery-main'),
        move_height = moveDom.offsetHeight,
        wrap_height = wrapDom.offsetHeight,
        moveTop = moveDom.offsetTop;
    var all_size = $('#lottery-wrap .lottery-list').size();

    var start_index = Math.floor(Math.random() * (all_size - 4));
    var start_top = -item_outer_height * start_index;
    var moveY = start_top;
    if (1 < all_size && all_size < 5) {
        var size = $('#lottery-wrap').html().repeat(6 - all_size);
        $('#lottery-wrap').html(size);
    } else {
        $('#lottery-wrap').html($('#lottery-wrap').html() + $('#lottery-wrap').html());
    }

    var justMove = function justMove(flag) {
        timer = nextFrame(function () {
            moveY -= speed;
            moveDom.style.top = moveY + 'px';
            if (-moveY >= move_height) {
                moveY = 0;
            }
            justMove(flag);
        });
    };

    if (isMove) {
        justMove(isMove);
    } else {
        return false;
    }
}

function startLottery() {
    isStart = true;
    isMove = false;

    isLock = true;

    lottery_btn.text('正在滚动 ^_^');
    lottery_btn.css('background', '#FFBFB7');

    setout_time = setTimeout(function () {
        speed = 8;
    }, 1000);

    setout_time = setTimeout(function () {
        speed = 16;
    }, 3000);

    setout_time = setTimeout(function () {
        speed = 30;
    }, 5000);
    setout_time = setTimeout(function () {
        speed = 50;
    }, 7000);
    setout_time = setTimeout(function () {
        speed = 90;
        $('#lottery-btn').text('可抽奖啦 @_@');

        isLock = false;
        clearTimeout(setout_time);
    }, 9000);
}

function drawAward(award, name_zh, name_en, pic_format) {
    var canvas = document.getElementById('lottery-canvas');
    var context = canvas.getContext('2d');
    if (!pic_format) {
        pic_format = 'png';
    }
    canvas.width = 700;
    canvas.height = 1300;
    var back_img = new Image();
    var avatar = new Image();
    avatar.src = './img/avatars/' + name_en + '.jpg';
    back_img.src = './img/award_' + award + '.' + pic_format;
    back_img.onload = function () {
        context.drawImage(back_img, 0, 0);

        circleImg(context, avatar, 158, 178, 200);

        context.fillStyle = '#D9AD61';
        context.font = "bold 6rem STKaiti";
        if (name_zh.length <= 2) {
            context.fillText(name_zh, 300, 1010);
        } else if (name_zh.length >= 3) {
            context.fillText(name_zh, 280, 1000);
        }
    };
}

function circleImg(ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
}

function substitute(str, o, regexp) {
    return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
        return o[name] === undefined ? '' : o[name];
    });
}

function bsRunWhen(fn, cod, name) {
    name = name || '';
    if (cod()) {
        fn();
        return;
    }

    var i = 0;
    var interval = setInterval(function () {
        i++;
        if (i > 500) {
            clearInterval(interval);
            console.log(name, ':', 'bsRunwhern timeout');
        } else if (cod()) {
            fn();
            clearInterval(interval);
        }
    }, 30);
};
function bsCheck(cod) {
    return new Promise(function (resolve, reject) {
        bsRunWhen(resolve, cod, 'bsCheck', reject);
    });
}
$(function () {
    getAward();
    justGo(isMove);

    $('#modal-close').click(function () {
        if (!can_stop) {
            console.error('还没结束，无法重开！');
            return false;
        }
        $('#lottery-result').modal('hide');
    });

    var music_local = local_handle.get('music') == '' ? '1' : local_handle.get('music');
    var music_config = {
        music: document.getElementById('music'),
        music_bool: music_local == '1',
        init: function init() {
            if (this.music_bool) {
                this.play();
            } else {
                this.music.pause();
            }
        },
        play: function play() {
            this.music.play();
            $('#music-control').addClass('animated infinite bounce');
            local_handle.set('music', 1);
            this.music_bool = true;
        },
        pause: function pause() {
            this.music.pause();
            $('#music-control').removeClass('animated infinite bounce');
            local_handle.set('music', 0);
            this.music_bool = false;
        }
    };
    music_config.init();
    $('#music-control').click(function () {
        if (music_config.music_bool) {
            music_config.pause();
        } else {
            music_config.play();
        }
    });

    $('#clear-control').click(function () {
        var sure = confirm('警告：确定清除所有数据？！');
        if (sure) {
            local_handle.clear();
            window.location.reload();
        }
    });

    if (local_handle.get("mingdan_toggle") == 1) {
        $('#mingdan-con').slideDown();
        $('#mingdan').hide();
    } else {
        $('#mingdan-con').hide();
        $('#mingdan').show();
    }
    if (local_handle.get("liwu_toggle") == 1) {
        $('#liwu-con').slideDown();
        $('#liwu').hide();
    } else {
        $('#liwu-con').hide();
        $('#liwu').show();
    }

    $('#mingdan').click(function () {
        $(this).fadeIn();
        $('#mingdan-con').slideDown(1000);
        local_handle.set("mingdan_toggle", 1);
    });
    $('#mingdan-title').click(function () {
        $('#mingdan-con').slideUp(1000);
        $('#mingdan').show();
        local_handle.set("mingdan_toggle", 0);
    });
    $('#liwu').click(function () {
        $(this).fadeOut();
        $('#liwu-con').slideDown(1000);
        local_handle.set("liwu_toggle", 1);
    });
    $('#liwu-title').click(function () {
        $('#liwu-con').slideUp(1000);
        $('#liwu').show();
        local_handle.set("liwu_toggle", 0);
    });

    var award_history = local_handle.get('award_history');
    if (award_history == 4) {
        $('#award-04').show();
        $('#award-123').hide();
    }
    $('#award04-toggle').click(function () {
        if ($('#award-04').is(":hidden")) {
            $('#award-04').show();
        } else {
            $('#award-04').hide();
        }

        if ($('#award-123').is(":hidden")) {
            $('#award-123').show();
        } else {
            $('#award-123').hide();
        }
    });

    var select_award = local_handle.get('select_award');
    if (select_award) {
        $('.award').eq(select_award - 1).addClass('award-active');
        $('#lottery-btn').data('award', select_award);
    } else {
        $('.award').eq(3).addClass('award-active');
        $('#lottery-btn').data('award', 4);
    }
    $('.award').click(function () {
        if (isStart) {
            console.error('正在抽奖ing，不允许更改奖项设置哦 ^_^');
            return false;
        }
        local_handle.set('select_award', $(this).data('award'));
        $('#lottery-btn').data('award', $(this).data('award'));
        $(this).addClass(function () {
            return $(this).hasClass('award-active') ? false : 'award-active';
        }).siblings('.award').removeClass('award-active');
    });

    lottery_btn.click(function () {
        var cur_lottery = $('#lottery-btn').data('award');
        if (!cur_lottery) {
            alert('请先设置好奖项再抽奖哦 ^_^');
            return;
        }

        if (award_log['award0' + cur_lottery] <= 0) {
            alert('该奖项已经抽完啦，请选择其它奖项哦 ^_^！');
            return;
        }

        if (!isStart && !isMove) {
            console.log('本轮已结束');
            window.location.reload();
            return false;
        }

        if (!isStart && isMove) {
            startLottery();
        } else if (isStart) {
            stopLottery();
        }
    });

    $(document).keypress(function (e) {
        if (e.keyCode == 32) {
            lottery_btn.click();
        }

        if (e.keyCode == 49) {
            $('#award-1').click();
        }
        if (e.keyCode == 50) {
            $('#award-2').click();
        }
        if (e.keyCode == 51) {
            $('#award-3').click();
        }
        if (e.keyCode == 52) {
            $('#award-4').click();
        }

        if (e.keyCode == 13) {
            $('#modal-close').click();
        }

        if (e.keyCode == 46) {
            $('#clear-control').click();
        }
    });
});
