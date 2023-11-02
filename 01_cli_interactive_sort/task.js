const { exit } = require('process');

const print = function(text) // function for output
{
    console.log(text);
}

const rl = require('readline').createInterface({ // interface for input
    input: process.stdin,
    output: process.stdout
});

let isWordOrNumber = function(text) // returns 0 if word, 1 if number, -1 if mix
{
    let word = /[a-zA-Z]/g.test(text);
    let num = /\d/.test(text);
    if (num && /\d\.\d*\./.test(text))
        {
            word = true;
            num = true;
        }
    let ret = 0;
    if (num)
        ret = 1;
    if (num&&word)
        ret = -1;
    return ret;
}

let splitAnswer = function(text) // splits text and removes empty array entries, that occur with split(" ")
{
    let array = text.split(" ");
    let new_array = [];
    for (i = 0; i < array.length;i++)
    {
        if(array[i].replaceAll(/\s/g,'').length > 0)
            new_array.push(array[i].replaceAll(/\s/g,''));
    };
    return new_array;
}

let workWithText = function(text) // splits one text array into two arrays, one with numbers, other with words
{
    let splitted = splitAnswer(text);
    let cleaned_words = [];
    let cleaned_numbers = [];
    for (i = 0; i < splitted.length;i++)
    {
        let number_or_word = isWordOrNumber(splitted[i]);
        if (number_or_word >= 0)
        {
            if (number_or_word > 0)
                cleaned_numbers.push(splitted[i]);
            else
                cleaned_words.push(splitted[i]);
        }
    }
    return [cleaned_words,cleaned_numbers];
}

let alphabetical = function (words) // prints array of words in alphabetical order
{
    print(words.sort())
}

let ascendingNumbers = function(numbers) // prints array of numbers in ascending order
{
    print(numbers.sort(function(a, b){return a-b}))
}

let descendingNumbers = function(numbers) // prints array of numbers in descending order
{
    print(numbers.sort(function(a, b){return b-a}))
}

let ascendingWords = function(words) // prints array of words in ascending order
{
    print(words.sort(function(a, b){return a.length-b.length}))
}

let uniqueWords = function(words) // prints unique words from array
{
    let unique_words = []
    for (i = 0; i < words.length; i++)
    {
        if(unique_words.indexOf(words[i])==-1)
        {
            unique_words.push(words[i]);
        }
    }
    print(unique_words);
}

let uniqueAny = function(words,numbers) // prints unique entries from two arrays
{
    let unique_entries = []
    for (i = 0; i < words.length; i++)
    {
        if(unique_entries.indexOf(words[i])==-1)
        {
            unique_entries.push(words[i]);
        }
    }
    
    for (i = 0; i < numbers.length; i++)
    {
        if(unique_entries.indexOf(numbers[i])==-1)
        {
            unique_entries.push(numbers[i]);
        }
    }
    print(unique_entries);
}

let handler = function(menu_text,text_array) // handles user input, the core of this program
{
    if (text_array==null)
    {
        rl.question("Please, enter 10 words or digits, separated by spaces: ",function(answer)
        {
            if(splitAnswer(answer).length>=10)
                handler(menu_text,answer);
            else
            {
                print("Wrong input, maybe you put in too little words and numbers, please, try again");
                handler(menu_text,null);
            }
        })
    }
    else
    {
        print(menu_text);
        rl.question("",function(answer)
        {
            if (answer == "exit") {
                rl.close();
                exit();
            }
            let arrays = workWithText(text_array);
            switch (answer)
            {
                case "1":
                    {
                        alphabetical(arrays[0]);
                        handler(menu_text,null);
                        break;
                    }
                case "2":
                    {
                        ascendingNumbers(arrays[1]);
                        handler(menu_text,null);
                        break;
                    }
                case "3":
                    {
                        descendingNumbers(arrays[1]);
                        handler(menu_text,null);
                        break;
                    }
                case "4":
                    {
                        ascendingWords(arrays[0]);
                        handler(menu_text,null);
                        break;
                    }
                case "5":
                    {
                        uniqueWords(arrays[0]);
                        handler(menu_text,null);
                        break;
                    }
                case "6":
                    {
                        uniqueAny(arrays[0],arrays[1]);
                        handler(menu_text,null);
                        break;
                    }
                default:
                    {
                        print("Wrong input, please, try again");
                        handler(menu_text,text_array);
                        break;
                    }
            }
        });
    }
}

let main = function() // main function, declares menu text and starts handler function
{
    let menu_text = 
    "\"1\" - Alphabetical order\n"+
    "\"2\" - Numbers, ascending order\n"+
    "\"3\" - Numbers, descending order\n"+
    "\"4\" - Words, by length in ascending order\n"+
    "\"5\" - Words, unique entries\n"+
    "\"6\" - Unique entries\n"+
    "\"exit\" - to exit the program\n";
    handler(menu_text,null);
}

main(); // starts the main function
