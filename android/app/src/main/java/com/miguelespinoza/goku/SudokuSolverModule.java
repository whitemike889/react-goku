package com.miguelespinoza.goku;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import go.bridge.Bridge;

/**
 * Created by miguele on 3/8/16.
 */
public class SudokuSolverModule extends ReactContextBaseJavaModule {

    public static final String TAG = "SudokuSolverModule";

    public SudokuSolverModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SudokuSolverAndroid";
    }

    @ReactMethod
    public void solve(String puzzle, Promise promise) {
        try {
            String result = Bridge.Solve(puzzle);
            WritableMap map = Arguments.createMap();
            map.putString("result", result);

            promise.resolve(map);
        } catch (Exception e) {
            Log.e(TAG, "Solve error: " + e.toString());
            promise.reject(e);
        }
    }
}
