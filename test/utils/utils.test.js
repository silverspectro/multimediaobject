describe("utils.concatObject", function() {
  let obj1 = {
        test : 'lol',
        test2 : 'test'
      },
      obj2 = {
        test3 : 'test3'
      },
      obj3 = {
        test : 'lol-xptdr',
        test2 : 'test-test'
      },
      obj4 = {
        test : 'lol-xptdr',
        test4 : 'test-test'
      },
      refObj = {
        test : 'lol',
        test2 : 'test',
        test3 : 'test3'
      },
      refObj2 = {
        test : 'lol',
        test2 : 'test',
        test3 : 'test3',
        test4 : 'test-test'
      };

  it("should concatenate 2 objects", function() {
    let resultObj = utils.concatObject(obj1,obj2);
    expect(resultObj).toEqual(refObj);
  });

  it("should not overwrite already defined keys", function() {
    let resultObj = utils.concatObject(obj1,obj3);
    expect(resultObj).toEqual(obj1);
  });

  it("should concatenate multiple objects and not overwrite already defined keys", function() {
    let resultObj2 = utils.concatObject(obj1,obj2,obj3,obj4);
    expect(resultObj2).toEqual(refObj2);
  });

});

describe("utils.Atoms", function() {
  let atomArray = [
      "block",
      "div",
      "header",
      "footer",
      "aside",
      "article",
      "main",
      "nav",
      "navigation",
      "span",
      "text",
      "p",
      "paragraphe",
      "ulist-container",
      "ulist",
      "ul",
      "unordered-list",
      "olist-container",
      "olist",
      "ol",
      "ordered-list",
      "list-element",
      "li",
      "code",
      "pre",
      "input",
      "textarea",
      "form",
      "image",
      "img",
      "button",
      "iframe",
      "video",
      "canvas",
      "audio"
    ],
    refObject = {
      "block" : "div",
      "div" : "div",
      "header" : "header",
      "footer" : "footer",
      "aside" : "aside",
      "article" : "article",
      "main" : "main",
      "nav" : "nav",
      "navigation" : "nav",
      "span" : "span",
      "text" : "p",
      "p" : "p",
      "paragraphe" : "p",
      "ulist-container" : "ul",
      "ulist" : "ul",
      "ul" : "ul",
      "unordered-list" : "ul",
      "olist-container" : "ol",
      "olist" : "ol",
      "ol" : "ol",
      "ordered-list" : "ol",
      "list-element" : "li",
      "li" : "li",
      "code" : "pre",
      "pre" : "pre",
      "input" : "input",
      "textarea" : "textarea",
      "form" : "form",
      "image" : "img",
      "img" : "img",
      "button" : "button",
      "iframe" : "iframe",
      "video" : "video",
      "canvas" : "canvas",
      "audio" : "audio"
    };

  it("should return a type based on the input", function(){
    for(let x = 0; x < atomArray.length; x++) {
      expect(utils.Atoms(atomArray[x])).toEqual(refObject[atomArray[x]]);
    }
  });
});

describe("utils.convertLeftToTime", function() {
  let baseWidth = 100,
      childrenLeftPosition = 32.7,
      extremeChildrenLeftPositon = 200,
      totalTime = 3;

  it("should return a time based parent size and a left position", function(){
    expect(utils.convertLeftToTime(baseWidth, childrenLeftPosition, totalTime)).toEqual('1.00');
  });
  it("should not return a time superior to the totalTime if the childrenPositon is to much", function(){
    expect(utils.convertLeftToTime(baseWidth, extremeChildrenLeftPositon, totalTime)).toEqual('3.00');
  });
  it("should return 0 if totalTime = 0", function(){
    expect(utils.convertLeftToTime(baseWidth, extremeChildrenLeftPositon, 0)).toEqual('0.00');
  });
  it("should return totalTime if baseWidth = 0", function(){
    expect(utils.convertLeftToTime(0, extremeChildrenLeftPositon, totalTime)).toEqual(totalTime.toFixed(2));
  });
});
