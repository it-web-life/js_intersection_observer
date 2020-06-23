// Intersection Observer API

const isIntersectionObserver = !!('IntersectionObserver' in window);
console.log('isIntersectionObserver', isIntersectionObserver)

const options = {
  // 1画面分の高さマージンをとる
  rootMargin: `${window.innerHeight}px 0px`
};

console.log('options', options);

// IntersectionObserver処理
const observerExec = () => {
  // ここの処理の前にisIntersectionObserverで判定をつけて、trueなら以下を実行、falseなら既存処理を行うようわける
  const observerParts = new IntersectionObserver((entries) => {
    console.log('%c---observer entries コールバック---', 'color: red;', entries);

    // 監視のコールバック処理
    entries.forEach((entry) => {
      console.log('intersection observer 呼び出し');

      console.log('isIntersecting', entry.isIntersecting);

      // 交差している場合
      if (entry.isIntersecting) {
        console.log('読み込み！');

        // 表示処理
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
};

// Intersection Observerが有効なブラウザのみ処理する (非対応ブラウザは別途ポリフィル導入や代替対応などが必要)
if (isIntersectionObserver) {
  observerExec();
}
