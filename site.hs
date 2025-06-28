--------------------------------------------------------------------------------

{-# LANGUAGE OverloadedStrings #-}
import           Data.Monoid
import           Control.Monad                  ( filterM )
import           Hakyll
import           Text.Pandoc

--------------------------------------------------------------------------------

main :: IO ()
main = hakyllWith config $ do

  -- css, js, images
  match "static/*/*" $ do
    route idRoute
    compile copyFileCompiler

  -- dummy compile to independently get meta information out of the projects pages like image links, titles, slugs, ...
  match "pages/projects/*" $ version "meta" $ do
    route idRoute
    compile getResourceBody
    
  -- all pages: index, about and all project pages
  match "pages/**" $ do
    route $ gsubRoute "pages/" (const "") `composeRoutes` gsubRoute "projects/" (const "") `composeRoutes` setExtension
      "html"

    compile $ do
      postList <- recentFirst =<< loadAll ("pages/projects/*" .&&. hasVersion "meta")
      let projectsCtx =
            listField "projects" siteCtx (return postList) <> siteCtx
      getResourceBody
        >>= applyAsTemplate projectsCtx
        >>= renderPandoc
        >>= loadAndApplyTemplate "templates/main.html"    projectsCtx
        >>= loadAndApplyTemplate "templates/default.html" projectsCtx
        >>= relativizeUrls

  -- HTML templates like footer, head, etc.
  match "templates/*" $ compile templateCompiler

--------------------------------------------------------------------------------

-- normal site context
siteCtx :: Context String
siteCtx =
  constField "site_description"  "benedikt mayer | portfolio"
    <> constField "site_title"        "benedikt mayer | portfolio"
    <> constField "github_username"   "benedikt-mayer"
    <> constField "linkedin_username" "benedikt-mayer-7ab235132"
    <> constField "email_username"    "benedikt_mayer"
    <> constField "email_domain"      "outlook"
    <> constField "email_tld"         "de"
    <> defaultContext

-- configuration for display
config :: Configuration
config = defaultConfiguration { previewHost = "0.0.0.0", previewPort = 35730 }
