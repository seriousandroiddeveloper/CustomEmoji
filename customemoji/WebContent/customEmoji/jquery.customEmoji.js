/**
Author @ Narayanan Chandran
jquery.customEmoji.js for Avaya Engagement Designer  
  
The MIT License (MIT)

Copyright (c) 2016 Narayanan Chandran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 * 
 */

(function($) {

    $.fn.customEmoji = function(options) {

    	var settings = $.extend({            
            color: "#556b2f",
            backgroundColor: "white",
            EmojiDefination : [{regex: /:-\)/g, img : "smiley.png", realEmoText : ":-)", type :"image/src", style :"width:20px;height:20px;"},{regex: /:-\(/g, img : "smiley.png", realEmoText : ":-(", type :"image/src",style :"width:20px;height:20px;"}],
            basepathEmojiImg : null
        }, options );
    	
    	
    	 return this.each( function() {
    		 var EmojiDefination = settings.EmojiDefination;
    		 $(this).keyup(function(evt){
    			 for ( var int = 0; int < EmojiDefination.length; int++) {
					var EmojiDefinationEle = EmojiDefination[int];
					var initialchildNodes = $(this)[0].childNodes;
					var resultantNode = [];
					if($(this)[0].textContent.search(EmojiDefinationEle.regex)!= -1){
						for ( var int2 = 0; int2 < initialchildNodes.length; int2++) {
							var childNode = initialchildNodes[int2];
							if(childNode.nodeName == '#text' && (childNode.textContent.search(EmojiDefinationEle.regex)!= -1)){
								var index = childNode.textContent.search(EmojiDefinationEle.regex);
								var substringFirst = childNode.textContent.substring(0, index);
								var substringSecond = childNode.textContent.substring(index+EmojiDefinationEle.realEmoText.length);
								
								resultantNode.push(substringFirst);
								resultantNode.push('<img src="'+settings.basepathEmojiImg+EmojiDefinationEle.img+'" style="'+EmojiDefinationEle.style+'"/>');
								resultantNode.push(substringSecond);
							}else{
								resultantNode.push(childNode);
							}
						}
												
						$(this).empty();
						$(this).append(resultantNode);
						
						var range = document.createRange();
					    var sel = window.getSelection();
					    var childNodesLength = $(this)[0].childNodes.length-1;
					    range.setStart($(this)[0].childNodes[childNodesLength], 0);
					    range.collapse(true);
					    sel.removeAllRanges();
					    sel.addRange(range);
					    $(this)[0].focus();
						
					}
				}
    			 
    		 });
    		 
         });

    };

}(jQuery));