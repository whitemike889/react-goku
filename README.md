Go-ku: Mobile App built using React Native and Golang
=====

![Go-ku Banner](https://cloud.githubusercontent.com/assets/6182543/13706057/835c3a46-e771-11e5-9c92-385b6c5c4cf8.png)

link to [Google Play Store](https://play.google.com/store/apps/details?id=com.miguelespinoza.goku)

## Reason
Curious about an Architecture to rule all mobile platforms! using **React Native** and **Golang**!

## Architecture
* **UI Layer:** [React Native](https://facebook.github.io/react-native/)
* **Logic Layer:** [Go mobile](https://godoc.org/golang.org/x/mobile/cmd/gomobile) using [goku lib](https://github.com/miguelespinoza/goku)
* **Persistence Layer** [Realm DB](https://realm.io/docs/react-native/latest/)

![Go-ku Android and iOS](https://user-images.githubusercontent.com/6182543/28248035-71e15310-6a0a-11e7-8538-b5946a9f071d.png)

## Development Tips:
Android and iOS Builds. Currently there's not a native module for the Go sdk.

### Run from source:
Dependencies: [react-native for android](https://facebook.github.io/react-native/docs/getting-started.html#content)

1. clone this repo
2. $ cd react-goku
3. $ npm install
4. $ react-native run-android

### Using/Updating Golang:
Dependencies: [gomobile](https://godoc.org/golang.org/x/mobile/cmd/gomobile)

1. clone [goku package](https://github.com/miguelespinoza/goku)
2. $ cd goku
2. $ gomobile bind -target android -o bridge.aar -v ./bridge
3. Import .aar file using Android Studio:
	* [steps](http://imgur.com/a/dEewm)
	* thanks to [Sajal Kayan!](http://www.sajalkayan.com/post/android-apps-golang.html)
4. Notice bridge.go, that's the proxy function used in order to communicate between Java and Go in Android.
	* Limited types are supported using gomobile

### Into React Native World:
Using Go package:

1. Create a class that extends ReactContextBaseJavaModule, and create a method using the ReactMethod annotation, you can use Bridge.java to call the Go proxy function [check this](https://github.com/miguelespinoza/react-goku/blob/master/android/app/src/main/java/com/miguelespinoza/goku/SudokuSolverModule.java#L30-L42)
2. Create a class that extends ReactPackage, [check this](https://github.com/miguelespinoza/react-goku/blob/master/android/app/src/main/java/com/miguelespinoza/goku/GokuReactPackage.java)
3. Pass the class in the getPackage function inside your [MainActivity class](https://github.com/miguelespinoza/react-goku/blob/master/android/app/src/main/java/com/miguelespinoza/goku/MainActivity.java#L41)
4. This allows you to expose that class using [NativeModules](https://github.com/miguelespinoza/react-goku/blob/master/app/native/SolverAndroid.js)
5. Profit! use that function wherever you want!

## TODO:
- [x] input from buttons, not OS keyboard
- [x] updating sudoku boards, need to introduce primaryKey
- [x] refactor to idiomatic react code : sorry came from Java and Go
- [ ] deleting sudoku boards
- [ ] Learn some integration testing for React Native
- [ ] (∩｀-´)⊃━☆ﾟ.*･｡ﾟ Animations! oooooooh!!!!