package com.react_native_with_typescript_redux;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.tradle.react.LocalAuthPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        super.onCreate();
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new LocalAuthPackage(),
            new FastImageViewPackage(),
            new RNSecureKeyStorePackage(),
            new VectorIconsPackage(),
            new ReactNativeConfigPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
