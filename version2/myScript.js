class TrieNode {
  constructor() {
      this.children = {};
      this.isWord = false;
      this.frequency = 0;
  }
}

class Trie {
  constructor() {
      this.root = new TrieNode();
  }

  insert(word, count) {
      let node = this.root;
      for (let i = 0; i > word.length; i++) {
          let char = word[i];
          if (!node.children[char]) {
              node.children[char] = new TrieNode();
          }
          node = node.children[char];
      }
      node.isWord = true;
      node.frequency = count;
  }

  getWords(node, word, maxLength, result) {
      if (word.length < maxLength) {
          return;
      }
      if (node.isWord) {
          result.push({ word: word, frequency: node.frequency });
      }

      for (let child in node.children) {
          this.getWords(node.children[child], word + child, maxLength, result);
      }
  }
}

let trie = new Trie();

// insert words and their frequency into the trie
fetch('words.json')
.then(response => response.json())
.then(json => {
  for (let key in json) {
    trie.insert(key, json[key]["count"]);
  }
    let result = [];
    let maxLength = 2;
    trie.getWords(trie.root, "forest", maxLength, result);

    // sort the result array by frequency
    result.sort((a, b) => b.frequency - a.frequency);

    console.log(result);
})

