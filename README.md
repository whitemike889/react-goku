Go-ku: Mobile App built using React Native and Golang
=====

![Go-ku Banner](https://cloud.githubusercontent.com/assets/6182543/13706057/835c3a46-e771-11e5-9c92-385b6c5c4cf8.png)

link to [Google Play Store](https://play.google.com/store/apps/details?id=com.miguelespinoza.goku)

## Reason
Curious about an Architecture to rule all mobile platforms! using **React Native** and **Golang**!

## Architecture
* **UI Layer:** [React Native](https://facebook.github.io/react-native/)
* **Logic Layer:** [Go mobile](https://godoc.org/golang.org/x/mobile/cmd/gomobile)
* **Persistence Layer** [Realm DB](https://realm.io/docs/react-native/latest/)

## Screenshots

### **Logic:** Using Golang to solve Sudoku Board
![Go-ku Insert](https://cloud.githubusercontent.com/assets/6182543/13706010/5b7ca2ea-e771-11e5-81fd-b2f830e03d20.png)
![Go-ku Solved](https://cloud.githubusercontent.com/assets/6182543/13706012/5b7d6fa4-e771-11e5-8bce-1295b23a163e.png)

### **Persistence:** Using Realm DB to save boards to a ListView
![Go-ku SavedOne](https://cloud.githubusercontent.com/assets/6182543/13706011/5b7cbfaa-e771-11e5-88c4-43c6152db7da.png)
![Go-ku SavedTwo](https://cloud.githubusercontent.com/assets/6182543/13706009/5b7c6690-e771-11e5-834e-b83278454d57.png)

### Can go back to a previously saved board
![Go-ku Selected](https://cloud.githubusercontent.com/assets/6182543/13706013/5b7f7c36-e771-11e5-968e-acc0099aad00.png)
![Go-ku Loaded](https://cloud.githubusercontent.com/assets/6182543/13706267/69b133a2-e772-11e5-950e-e270b6de4a8c.png)

## TODO:
* input from buttons, not OS keyboard
* deleting sudoku boards
* updating sudoku boards, need to introduce primaryKey
* refactor to idiomatic react code : sorry came from Java and Go
* Realm Results should "auto-update" the list? or is it only "auto-updated" if it is already in the list? so adding new models I have to manually update the list again?
* Learn some integration testing for React Native
* (∩｀-´)⊃━☆ﾟ.*･｡ﾟ Animations! oooooooh!!!!
