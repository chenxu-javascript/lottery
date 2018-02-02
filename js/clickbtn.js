// 执行空格键操作，等价于执行 “抽奖按钮点击” 操作
function keybtn() {
  $(document).keypress(function (e) {
      if (e.keyCode == 32) {
          lottery_btn.click();
      }
      // 一、二、三、纪念奖
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
      // Enter 按键
      if (e.keyCode == 13) {
          $('#modal-close').click();
      }
      // delete按键
      if (e.keyCode == 46) {
          $('#clear-control').click();
      }
  });
}
// 控制奖项的选择
// 1: 一等奖
// 2: 二等奖
// 3: 三等奖
// 4: 纪念奖
function awarded() {
  var select_award = local_handle.get('select_award');
  if (select_award) {
      $('.award').eq(select_award-1).addClass('award-active');
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
     }).siblings('.award').removeClass('award-active')
  });
}

function music() {
  // 音乐开关
  var music_local = (local_handle.get('music') == '') ? '1' : local_handle.get('music');
  var music_config = {
      music: document.getElementById('music'),
      music_bool: (music_local == '1'),
      init: function() {
          if (this.music_bool) {
              this.play();
          } else {
              this.music.pause();
          }
      },
      play: function() {
          this.music.play();
          $('#music-control').addClass('animated infinite bounce');
          local_handle.set('music', 1);
          this.music_bool = true
      },
      pause: function() {
          this.music.pause();
          $('#music-control').removeClass('animated infinite bounce');
          local_handle.set('music', 0);
          this.music_bool = false;
      }
  };
  music_config.init();
  $('#music-control').click(function () {
      if (music_config.music_bool) {
          music_config.pause()
      } else {
          music_config.play();
      }
  });
}

function clearList() {
  // 清除数据开关
  $('#clear-control').click(function () {
      var sure = confirm('警告：确定清除所有数据？！');
      if (sure) {
          local_handle.clear();
          window.location.reload();
      }
  });
}


function showAward() {
  // 控制：显示/隐藏纪念奖
  var award_history = local_handle.get('award_history');
  if (award_history == 4) {
      $('#award-04').show();
      $('#award-123').hide();
  }
  $('#award04-toggle').click(function() {
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
}

function showmindan() {
    // 控制：显示/隐藏 抽奖名单和抽奖奖品显示
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
    $('#mingdan-title').click(function() {
        $('#mingdan-con').slideUp(1000);
        $('#mingdan').show();
        local_handle.set("mingdan_toggle", 0);
    });
    $('#liwu').click(function () {
        $(this).fadeOut();
        $('#liwu-con').slideDown(1000);
        local_handle.set("liwu_toggle", 1);
    });
    $('#liwu-title').click(function() {
        $('#liwu-con').slideUp(1000);
        $('#liwu').show();
        local_handle.set("liwu_toggle", 0);
    });
}

export {
  keybtn,
  awarded,
  music,
  clearList,
  showAward,
  showmindan
}
