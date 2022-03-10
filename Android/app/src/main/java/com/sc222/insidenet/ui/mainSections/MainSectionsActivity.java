package com.sc222.insidenet.ui.mainSections;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.sc222.insidenet.R;
import com.sc222.insidenet.databinding.ActivityMainSectionsBinding;
import com.sc222.insidenet.ui.webview.constants.UrlConstants;

public class MainSectionsActivity extends AppCompatActivity implements BottomNavigationView.OnNavigationItemSelectedListener {
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        Toast.makeText(getApplicationContext(),"WEBVIEW NAVIGATE TO: "+item.getItemId(), Toast.LENGTH_SHORT).show();
        return true;
    }

    //TODO:  track active url and update navigationBar

    private class DefaultWebClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            if (UrlConstants.WEB_VIEW_URL.equals(request.getUrl().getHost())) {
                // This is my website, so do not override; let my WebView load the page
                return false;
            }
            // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
            Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
            startActivity(intent);
            return true;
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            super.onPageStarted(view, url, favicon);
            Toast.makeText(getApplicationContext(),"LOADING STARTED", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            Toast.makeText(getApplicationContext(),"LOADING FINISHED", Toast.LENGTH_SHORT).show();
        }
    }


    //TODO replace fragments with webview urls
    //WEBVIEW TODO: set login and logout cookies in login activity and then redirect here. if token is expired -> redirect too
    //TODO: progressbar

    private ActivityMainSectionsBinding binding;
    //private NavController navController;

    @Override
    public void onBackPressed() {
        /*if (Objects.requireNonNull(navController.getCurrentDestination()).getId() == R.id.profileFragment)
            this.finishAffinity();
        else
            super.onBackPressed();*/
        super.onBackPressed();
    }


    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainSectionsBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        setSupportActionBar(binding.toolbar);

        binding.bottomNavigation.setOnNavigationItemSelectedListener(this);

        //navController = Navigation.findNavController(this, R.id.nav_host_main_sections);

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.profileFragment, R.id.dataAccessFragment, R.id.calendarFragment,R.id.contactsFragment)
                .build();

        //TODO: move to init method
        WebSettings webSettings = binding.webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setUseWideViewPort(true);
        // webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);
        binding.webView.setWebViewClient(new DefaultWebClient());
        binding.webView.loadUrl(UrlConstants.WEB_VIEW_URL);



       /* NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(binding.bottomNavigation, navController);*/
    }
}