
class Trie {
    constructor() {
      this.root = new TrieNode();
    }
    insert(word, frequency) {
      let currentNode = this.root;
      for (let i = 0; i < word.length; i++) {
        let char = word[i];
        if (!currentNode.children[char]) {
          currentNode.children[char] = new TrieNode();
        }
        currentNode = currentNode.children[char];
      }
      currentNode.isEndWord = true;
      currentNode.frequency = frequency;
      currentNode.word = word;
    }
    search(letters,minLength) {
      let currentNode = this.root;
      let possibleWords = [];
      let currentWord = '';
      for (let i = 0; i < letters.length; i++) {
        let char = letters[i];
        if (currentNode.children[char]) {
          currentWord += char;
          currentNode = currentNode.children[char];
          if(currentNode.isEndWord && currentNode.frequency && currentNode.word.length >= minLength) {
              possibleWords.push({word: currentNode.word, frequency: currentNode.frequency});
          }
        } else {
          currentNode = this.root;
          currentWord = '';
        }
      }
      return possibleWords;
    }
  }
  
  class TrieNode {
    constructor() {
      this.children = {};
      this.isEndWord = false;
      this.frequency = 0;
      this.word = '';
    }
  }
  
  // create a new Trie object
  let trie = new Trie();
  
  // insert words from json file

  for(let word in json) {
    trie.insert(word, json[word].count);
  }
  
  // function to filter words by length
  function filterWordsByLength(possibleWords, minLength) {
    return possibleWords.filter(word => word.word.length >= minLength);
  }
  
  // search button event listener
  document.getElementById("search-button").addEventListener("click", function(){
    let letters = document.getElementById("letters").value;
    let minLength = document.getElementById("min-length").value;
    let possibleWords = trie.search(letters, minLength);
    possibleWords.sort((a,b) => b.frequency - a.frequency);
    let filteredWords = filterWordsByLength(possibleWords, minLength);
    let results = document.getElementById("results");
  let list = document.createElement("ul");
  filteredWords.forEach(function(word) {
    let item = document.createElement("li");
    item.innerHTML = `${word.word} - ${word.frequency}`;
    list.appendChild(item);
  });
  results.appendChild(list);
});