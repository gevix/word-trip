
class Trie {
    constructor() {
        this.root = {};
    }

    insert(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!current[word[i]]) {
                current[word[i]] = {};
            }
            current = current[word[i]];
        }
        current.isWord = true;
    }

    search(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!current[word[i]]) {
                return false;
            }
            current = current[word[i]];
        }
        return current.isWord === true;
    }
}


function permutations(chars) {
    // Create an empty array to store the combinations
    let combinations = [];
  
    // Helper function to generate the combinations
    function generateCombinations(current, index) {
      // Add the current combination to the list of combinations
      combinations.push(current);
      // Iterate through the remaining characters
      for (let i = index; i < chars.length; i++) {
        // Generate combinations with the current character
        generateCombinations(current + chars[i], i + 1);
        generateCombinations(current, i + 1);
      }
    }
    // Generate the combinations starting with an empty string
    generateCombinations('', 0);
    combinations = [... new Set(combinations)];
    return combinations;
  }

function findWord (letters) {
    let wordPermutations = permutations(letters);
    let result = [];
    for (let perm of wordPermutations) {
        if (trie.search(perm)) {
            result.push(perm);
        }
    }
    return result;
}


let myChars = 'young';
let desiredLength = 3;

// Fetch the JSON file containing the words and frequencies

let trie = new Trie();
fetch('words.json')
.then(response => response.json())
.then(data => {
    // Iterate through each word in the JSON file
    for (let word in data) {
        // Insert the word into the Trie
        trie.insert(word);
    }
    console.log("JSON file loaded into Trie structure");
    let wordsThatExist = findWord(myChars);
    let wordsOfTheDesiredLength = [];
    for (let i = 0; i < wordsThatExist.length; i ++) {
        if (wordsThatExist[i].length >= desiredLength) {
            wordsOfTheDesiredLength.push(wordsThatExist[i]);
        }
    }
    
    wordsOfTheDesiredLength.sort((a, b) => {
    return data[b].count - data[a].count;

    
});

    console.log(wordsOfTheDesiredLength);
 
})
.catch(error => console.error(error));







