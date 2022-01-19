package com.haraxy.weather;

import android.content.Context;

import androidx.core.widget.NestedScrollView;

import com.facebook.react.uimanager.ViewManager;

public class Demo {

    Demo() {

    }
    public NestedScrollView startNested(Context mContext){
        NestedScrollView mNestedScrollView = new NestedScrollView(mContext);
        return mNestedScrollView;
    }
}
