
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


function permutations(letters) {
    let combinations = [];
  
    function generate(combination, letters) {
      combinations.push(combination);
  
      for (let i = 0; i < letters.length; i++) {
        const newLetters = letters.slice(0, i).concat(letters.slice(i + 1));
        generate(combination + letters[i], newLetters);
      }
    }
  
    generate("", letters);

    combinations = [...new Set(combinations)];
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

// create new trie
let trie = new Trie();


document.getElementById("search-button").addEventListener("click", function(){

    let myChars = document.getElementById("letters").value;
    let desiredLength = document.getElementById("min-length").value;

    // Fetch the JSON file containing the words and frequencies

    fetch('words.json')
    .then(response => response.json())
    .then(data => {
        // Iterate through each word in the JSON file
        for (let word in data) {
            // Insert the word into the Trie
            trie.insert(word);
        }
        console.log("JSON file loaded into Trie structure");

        console.log(permutations(myChars));
        let wordsThatExist = findWord(myChars);

        // Keep all words that are longer then desiredLength
        
        let wordsOfTheDesiredLength = [];
        for (let i = 0; i < wordsThatExist.length; i ++) {
            if (wordsThatExist[i].length >= desiredLength) {
                wordsOfTheDesiredLength.push(wordsThatExist[i]);
            }
        }

        // Sort words by frequency

        wordsOfTheDesiredLength.sort((a, b) => {
        return data[b].count - data[a].count;
        });

        console.log(wordsOfTheDesiredLength);

        const words = wordsOfTheDesiredLength;
        const resultsDiv = document.getElementById("results");

        let resultHTML = "";
        for (let i = 0; i < words.length; i++) {
            resultHTML += words[i];
            if (i < words.length - 1) resultHTML += ", ";
        }

        resultsDiv.innerHTML = resultHTML;

    })
    .catch(error => console.error(error));

    


});



