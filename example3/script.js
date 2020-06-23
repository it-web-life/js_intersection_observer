// Intersection Observer API

const options = {
  // 1画面分の高さマージンをとって先読み込みする
  rootMargin: `${window.innerHeight}px 0px`
};

console.log('options', options);

// Intersection Observer処理
const observerParts = new IntersectionObserver((entries) => {
  console.log('%c---observer entries コールバック---', 'color: red;', entries);

  // 監視のコールバック処理
  entries.forEach((entry) => {
    console.log('intersection observer 呼び出し');

    console.log('isIntersecting', entry.isIntersecting);

    // 交差している場合
    if (entry.isIntersecting) {
      console.log('読み込み！');

      // 画像を取得
      const imageElement = [...entry.target.getElementsByTagName('img')];

      // 画像があるか確認
      if (!imageElement.length) return;

      // 画像を表示する
      const imageUrl = imageElement[0].getAttribute('data-src');
      imageElement[0].setAttribute('src', imageUrl);
      // 視認できるようにCSSのopacity制御もかけています
      entry.target.classList.remove('hide');

      // 監視を解除する
      observerParts.unobserve(entry.target);
    }
  });
}, options);

// 監視する要素を取得
const partsTargets = [...document.getElementsByClassName('js-intersection-load')];

// 監視する要素をIntersection Observer登録
partsTargets.forEach((target) => observerParts.observe(target));
