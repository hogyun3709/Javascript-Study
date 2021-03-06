<script>

const $ = {};

// $.qs = (selector, parnet) => document.querySelector(selector, parent);
// $.qs = document.querySelector.bind(document);
// $.qsa = document.querySelectorAll.bind(document);
/* 인자가 가변으로 적용되어있는것은 커링 적용이 안됨 */
$.qs = (selector, parent = document) => parent.querySelector(selector);
$.qsa = (selector, parent = document) => parent.querySelectorAll(selector);

$.find = _.curry($.qs);
$.findAll = _.curry($.qsa);

$.el = html => {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap.children[0];
};

$.append = _.curry((parent, child) => parent.appendChild(child));
// $.closest = (selector, el) => el.closest(selector); // currying
$.closest = _.curry((selector, el) => el.closest(selector));
$.remove = el => el.parentNode.removeChild(el);

//iterable 일때만 적용
// $.on = (event, f) => elements => _.each( el => el.addEventListener('click', f), elements);

$.on = (event, f) => elements => _.each( el => el.addEventListener(event, f),
  _.isIterable(elements) ? elements : [elements]
);



</script>
<script>
const Images = {};

Images.fetch = () => new Promise(resolve => setTimeout(() => resolve([
  { name: "HEART", url: "https://s3.marpple.co/files/m2/t3/colored_images/45_1115570_1162087.png" },
  { name: "하트", url: "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819.png" },
  { name: "2", url: "https://s3.marpple.co/f1/2018/1/1054966_1516076769146_28397.png" }, { name: "6", url: "https://s3.marpple.co/f1/2018/1/1054966_1516076919028_64501.png"},{"name":"도넛","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918758054_55883.png"},{"name":"14","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077199329_75954.png"},{"name":"15","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077223857_39997.png"},{"name":"시계","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918485881_30787.png"},{"name":"돈","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918585512_77099.png"},{"name":"10","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077029665_73411.png"},{"name":"7","url":"https://s3.marpple.co/f1/2018/1/1054966_1516076948567_98474.png"},{"name":"농구공","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918719546_22465.png"},{"name":"9","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077004840_10995.png"},{"name":"선물","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918791224_48182.png"},{"name":"당구공","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918909204_46098.png"},{"name":"유령","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918927120_12321.png"},{"name":"원숭이","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919417134_80857.png"},{"name":"3","url":"https://s3.marpple.co/f1/2018/1/1054966_1516076802375_69966.png"},{"name":"16","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077254829_36624.png"},{"name":"안경","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918944668_23881.png"},{"name":"폭죽","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919005789_67520.png"},{"name":"폭죽 2","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919027834_48946.png"},{"name":"박","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919062254_67900.png"},{"name":"톱니바퀴","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919302583_24439.png"},{"name":"11","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077078772_79004.png"},{"name":"핫도그","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919086961_23322.png"},{"name":"고기","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919274214_33127.png"},{"name":"책","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919326628_13977.png"},{"name":"돋보기","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919363855_26766.png"},{"name":"집","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919395033_19373.png"},{"name":"사람","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918696715_44274.png"},{"name":"연필","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919437239_32501.png"},{"name":"파일","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919468582_23707.png"},{"name":"스피커","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919495804_49080.png"},{"name":"트로피 ","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918438617_69000.png"},{"name":"카메라","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919847041_33220.png"},{"name":"그래프","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918521301_43877.png"},{"name":"가방","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918642937_11925.png"},{"name":"입술","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919886042_10049.png"},{"name":"fire","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920036111_19302.png"},{"name":"TV","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920054808_42469.png"},{"name":"핸드폰","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920109727_43404.png"},{"name":"노트북","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920142776_26474.png"},{"name":"전구","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920181784_14964.png"},{"name":"장미","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920264149_78607.png"},{"name":"맥주","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920312701_18073.png"},{"name":"마이크","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920397855_39832.png"},{"name":"별","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920420823_49166.png"},{"name":"와이파이","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920438005_35247.png"},{"name":"헤드폰","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920468136_82088.png"},{"name":"peace","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920538719_19072.png"},{"name":"계산기","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920348341_40080.png"},{"name":"poo 2","url":"https://s3.marpple.co/f1/2019/1/1235206_1548924259247_12839.png"},{"name":"poo 3","url":"https://s3.marpple.co/f1/2019/1/1235206_1548924850867_72121.png"},{"name":"poo 4","url":"https://s3.marpple.co/f1/2019/1/1235206_1548925154648_40289.png"},{"name":"poo","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918988097_38121.png"},{"name":"모니터","url":"https://s3.marpple.co/f1/2016/7/1043023_1469769774483.png"},{"name":"talk","url":"https://s3.marpple.co/f1/2019/1/1235206_1548927111573_76831.png"},{"name":"keyboard","url":"https://s3.marpple.co/f1/2018/1/1054966_1516330864360_25866.png"},{"name":"daily 2","url":"https://s3.marpple.co/f1/2019/1/1235206_1548926169159_58295.png"},{"name":"daily","url":"https://s3.marpple.co/f1/2018/7/1199664_1531814945451_49451.png"},{"name":"편지","url":"https://s3.marpple.co/f1/2019/1/1235206_1548920087850_99421.png"},{"name":"sns 하단바 2","url":"https://s3.marpple.co/f1/2019/1/1235206_1548917218903_88079.png"},{"name":"sns 하단바","url":"https://s3.marpple.co/f1/2019/1/1235206_1548917192465_28365.png"},{"name":"sns 이모지 6","url":"https://s3.marpple.co/f1/2019/1/1235206_1548927313417_99007.png"},{"name":"sns 이모지","url":"https://s3.marpple.co/f1/2019/1/1235206_1548927219485_18861.png"},{"name":"13","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077164559_59630.png"},{"name":"iphone","url":"https://s3.marpple.co/f1/2016/7/1043023_1469769886837.png"},{"name":"아이패드","url":"https://s3.marpple.co/f1/2016/7/1043023_1469769820297.png"},{"name":"컴퓨터","url":"https://s3.marpple.co/f1/2016/7/1043023_1469769802862.png"},{"name":"5","url":"https://s3.marpple.co/f1/2018/1/1054966_1516076888018_74741.png"},{"name":"poo 1","url":"https://s3.marpple.co/f1/2019/1/1235206_1548924230868_28487.png"},{"name":"Sns icon_똥 안경","url":"https://s3.marpple.co/f1/2017/2/1043404_1487211657799.png"},{"name":"Sns icon_똥 웃음","url":"https://s3.marpple.co/f1/2017/2/1043404_1487211686108.png"},{"name":"4","url":"https://s3.marpple.co/f1/2018/1/1054966_1516076850148_36610.png"},{"name":"Sns icon_똥 놀림","url":"https://s3.marpple.co/f1/2017/2/1043404_1487211670017.png"},{"name":"달력","url":"https://s3.marpple.co/f1/2019/1/1235206_1548919531014_35045.png"},{"name":"자물쇠","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918410738_59815.png"},{"name":"손 이모지","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918353391_54897.png"},{"name":"Sns icon_손바닥","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210472038.png"},{"name":"Sns icon_검지","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210393226.png"},{"name":"Sns icon_롹","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210522978.png"},{"name":"Sns icon_하이파이브","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210538695.png"},{"name":"Sns icon_브이","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210508758.png"},{"name":"Sns icon_중지","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210428137.png"},{"name":"Sns icon_주먹","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210372629.png"},{"name":"Sns icon_박수","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210444994.png"},{"name":"Sns icon_따봉","url":"https://s3.marpple.co/f1/2017/2/1043404_1487210488684.png"},{"name":"손 이모지 2","url":"https://s3.marpple.co/f1/2019/1/1235206_1548921736267_35010.png"},{"name":"손 이모지 3","url":"https://s3.marpple.co/f1/2019/1/1235206_1548922150829_10878.png"}
]), 200));
/* Array를 String 문자열로 만들면 , 쉼표가 찍혀서 출력됨 */
/* 문자열 의 합을 만들기위해 a + b 대신 literal 을 사용함 */
const string = iter => _.reduce((a, b) => `${a}${b}`, iter);

/* flatMap 함수와 유사함 */
_.strMap = _.curry(_.pipe(L.map, string));

Images.tmpl = imgs => `
  <div class="images">
    ${_.strMap(img => `
      <div class="image">
        <div class="box"><img src="${img.url}" alt=""></div>
        <div class="name">${img.name}</div>
        <div class="remove">x</div>

      </div>
    `, imgs)}
  </div>
`;


_.go(
  Images.fetch(),
  Images.tmpl,
  $.el,
  /* 함수에 인자를 전달하는 형식 */
  // el => document.querySelector('body').appendChild(el),
  // el => $.append($.qs('body'), el), //currying 적용전
  $.append($.qs('body')),
  // el => $.qsa('.image', el), // currying 적용전
  $.findAll('.remove'),
  /* NodeList 는 array는 아니지만 iterable 이라 조회가 가능함 */
  /* $.on 으로 간결하게 표현 */
  // _.each( el => el.addEventListener('click', e => _.go(
  //   e.currentTarget,
  //   // el => el.closest('.image'),  // method 중심
  //   // el => $.closest('.image', el) // curry 적용전
  //   $.closest('.image'),
  //   $.remove,
  $.on('click', e => {
    if (confirm('R U sure to remove this content?')){
      _.go(
        e.currentTarget,
        $.closest('.image'),
        $.remove)
      }
    }
  ));



</script>
/* 경고창 만들기 */
<script>

  Ui.confirm = msg => _.go(
    `
      <div class="confirm">
        <div class="body">
          <div class="msg">${msg}</div>
            <div class="buttons">
              <button type="button" class="cancel">취소</button>
              <button type="button" class="ok">확인</button>
            </div>
        </div>
      </div>
    `,
    $.el,
    $.append($.qs('body')),
    /* _.tap 함수를 이용해 elment 외부변화를 적용받지 않고 함수실행을 할수있게끔 양자선택을 도와줌 */
    _.tap(
      $.find('ok'),
      $.on('click', e => _.go(
        e.currentTarget,
        $.closest('.confirm'),
        $.remove
      ))),
    _.tap(
      $.find('ok'),
      $.on('click', e => _.go(
        e.currentTarget,
        $.closest('.confirm'),
        $.remove
      )))
  );

  Ui.confirm('정말 삭제 하시겠습니까?')
</script>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>01/5</title>
  <script src="./fx.js"></script>
</head>
<style>
    .fade {
      opacity: 0;
    }
    .fade-in {
      opacity: 1;
      transition: opacity 0.3s;
    }
    .confirm {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 2;
    }
    .confirm .body {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 300px;
      height: 160px;
      background: #fff;
      border-radius: 8px;
      text-align: center;
    }
    .confirm .msg {
      padding: 0 24px;
      margin-top: 56px;
      margin-bottom: 16px;
    }
    .confirm button {
      padding: 8px;
      width: 60px;
      border: 0;
      background: #eee;
      border-radius: 8px;
      margin: 3px;
    }
    .confirm button.ok {
      border: 0;
      color: #fff;
      background: #000;
    }
    .images {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 16px;
      overflow: auto;
      text-align: center;
    }
    .image {
      position: relative;
      display: inline-block;
      width: 160px;
      margin: 4px;
    }
    .image .remove {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 24px;
      height: 24px;
      padding: 3px 0 0;
      box-sizing: border-box;
      text-align: center;
      background: #000;
      color: #fff;
      font-weight: bold;
      border-radius: 50%;
      cursor: pointer;
    }
    .image .box {
      position: relative;
      width: 160px;
      height: 160px;
      border: 1px solid #ccc;
      margin-bottom: 8px;
    }
    .image img {
      position: absolute;
      top: 0px;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 90px;
      max-height: 90px;
      margin: auto;
    }
    .image .name {
      text-align: center;
      height: 20px;
      overflow: hidden;
    }
  </style>
<body>
<div style="display: none;">

1. 이미지 목록 그리기

2. 경고창 만들기
- confirm
- Promise
- alert
- 중복제거

3. 이미지 동시성 다루기

4. 페이지 띄우기

</div>
<script>

const $ = {};

// $.qs = (selector, parnet) => document.querySelector(selector, parent);
// $.qs = document.querySelector.bind(document);
// $.qsa = document.querySelectorAll.bind(document);
/* 인자가 가변으로 적용되어있는것은 커링 적용이 안됨 */
$.qs = (selector, parent = document) => parent.querySelector(selector);
$.qsa = (selector, parent = document) => parent.querySelectorAll(selector);

$.find = _.curry($.qs);
$.findAll = _.curry($.qsa);

$.el = html => {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  return wrap.children[0];
};

$.append = _.curry((parent, child) => parent.appendChild(child));
// $.closest = (selector, el) => el.closest(selector); // currying
$.closest = _.curry((selector, el) => el.closest(selector));
$.remove = el => el.parentNode.removeChild(el);

//iterable 일때만 적용
// $.on = (event, f) => elements => _.each( el => el.addEventListener('click', f), elements);

$.on = (event, f) => elements => _.each( el => el.addEventListener(event, f),
  _.isIterable(elements) ? elements : [elements]
);



</script>
<script>
const Images = {};

Images.fetch = () => new Promise(resolve => setTimeout(() => resolve([
  { name: "HEART", url: "https://s3.marpple.co/files/m2/t3/colored_images/45_1115570_1162087.png" },
  { name: "하트", url: "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819.png" },
  { name: "2", url: "https://s3.marpple.co/f1/2018/1/1054966_1516076769146_28397.png" }, { name: "6", url: "https://s3.marpple.co/f1/2018/1/1054966_1516076919028_64501.png"},{"name":"도넛","url":"https://s3.marpple.co/f1/2019/1/1235206_1548918758054_55883.png"},{"name":"14","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077199329_75954.png"},{"name":"15","url":"https://s3.marpple.co/f1/2018/1/1054966_1516077223857_39997.png"}]), 200));
/* Array를 String 문자열로 만들면 , 쉼표가 찍혀서 출력됨 */
/* 문자열 의 합을 만들기위해 a + b 대신 literal 을 사용함 */
const string = iter => _.reduce((a, b) => `${a}${b}`, iter);

/* flatMap 함수와 유사함 */
_.strMap = _.curry(_.pipe(L.map, string));

Images.tmpl = imgs => `
  <div class="images">
    ${_.strMap(img => `
      <div class="image">
        <div class="box"><img src="${img.url}" alt=""></div>
        <div class="name">${img.name}</div>
        <div class="remove">x</div>
      </div>
    `, imgs)}
  </div>
`;


_.go(
  Images.fetch(),
  Images.tmpl,
  $.el,
  /* 함수에 인자를 전달하는 형식 */
  // el => document.querySelector('body').appendChild(el),
  // el => $.append($.qs('body'), el), //currying 적용전
  $.append($.qs('body')),
  // el => $.qsa('.image', el), // currying 적용전
  $.findAll('.remove'),
  /* NodeList 는 array는 아니지만 iterable 이라 조회가 가능함 */
  /* $.on 으로 간결하게 표현 */
  // _.each( el => el.addEventListener('click', e => _.go(
  //   e.currentTarget,
  //   // el => el.closest('.image'),  // method 중심
  //   // el => $.closest('.image', el) // curry 적용전
  //   $.closest('.image'),
  //   $.remove,
  $.on('click', e => {
    if (confirm('R U sure to remove this content?')){
      _.go(
        e.currentTarget,
        $.closest('.image'),
        $.remove)
      }
    }
  ));
/* 경고창 만들기 */

const Ui = {};
Ui.confirm = msg => _.go(
  `
    <div class="confirm">
      <div class="body">
        <div class="msg">${msg}</div>
          <div class="buttons">
            <button type="button" class="cancel">취소</button>
            <button type="button" class="ok">확인</button>
          </div>
      </div>
    </div>
  `,
  $.el,
  $.append($.qs('body')),
  /* _.tap 함수를 이용해 elment 외부변화를 적용받지 않고 함수실행을 할수있게끔 양자선택을 도와줌 */
  // _.tap(
  //   $.find('ok'),
  //   $.on('click', e => _.go(
  //     e.currentTarget,
  //     $.closest('.confirm'),
  //     $.remove
  //   ))),
    $.find('ok'),
    $.on('click', e => _.go(
      e.currentTarget,
      $.closest('.confirm'),
      $.remove
    )),
    console.log
);



</script>

</body>
</html>
