# Urdu Learning Studio

A web-based Urdu learning application with Microsoft Translator API integration for real-time word and phrase translation.

## Current Status

The app is fully functional with the following features working:
- ✅ Microsoft Translator API integration
- ✅ Single word translation on click
- ✅ Multi-word phrase translation via drag-to-select
- ✅ Vocabulary saving and management
- ✅ Page navigation (3 sentences per page)
- ✅ Full page translation toggle (Urdu ↔ English)
- ✅ Jump-to-word functionality with tooltips
- ✅ RTL/LTR text direction handling
- ⚠️ BBC article integration (partially working - data exists but not showing in dropdown)

## Files Structure

```
Urdu app/
├── urdu-app-clean.html    # Main application file
├── Sheet1.html            # BBC RSS data in HTML table format  
├── BBC rss.xlsx          # Original Excel file with BBC articles
├── error.jpg             # Screenshot showing translation issue (now fixed)
└── README.md             # This file
```

## Key Features

### 1. Translation System
- **API**: Microsoft Translator API
- **API Key**: Configured via environment variables (TRANSLATOR_API_KEY)
- **Region**: `uksouth`
- **Caching**: Translation results are cached to improve performance
- **Proxy**: Uses `corsproxy.io` to handle CORS issues

### 2. User Interactions
- **Single word**: Click any Urdu word → instant translation
- **Multi-word phrase**: Drag across multiple words → phrase translation on mouse release
- **Save vocabulary**: Click "Save Word/Phrase" button after translation
- **Jump to saved words**: Click "Jump to" button next to saved vocabulary items

### 3. Navigation
- **Page chunks**: Stories split into 3 sentences per page
- **Navigation**: Previous/Next buttons
- **Full page translation**: Toggle button to translate entire page
- **Story selection**: Dropdown with 4 built-in stories + BBC article (when working)

## Technical Implementation

### Translation Function
```javascript
async function translateText(text) {
    const url = 'https://corsproxy.io/?' + encodeURIComponent(
        'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=ur&to=en'
    );
    // Uses Microsoft Translator API with CORS proxy
}
```

### Multi-word Selection
- `handleWord()`: Starts selection on mousedown
- `handleWordEnter()`: Extends selection during drag
- `handleMouseUp()`: Triggers translation on mouse release
- Global mouse event listener prevents selection issues

### RTL/LTR Handling
- Urdu text: `direction: rtl`, `text-align: right`
- English text: `direction: ltr`, `text-align: left`
- Proper punctuation positioning for both languages

## Current Issue: BBC Article Integration

### Problem
BBC article data exists in `Sheet1.html` but doesn't appear in story dropdown.

### Data Location
- **File**: `Sheet1.html` 
- **Structure**: HTML table with multiple columns
- **Article content**: Column H (index 7) contains full article text
- **Article title**: Column A (index 0) contains article titles
- **Content starts with**: `،تصویر کا ذریعہ` (image metadata that needs cleaning)

### Expected Behavior
The `loadBBCArticle()` function should:
1. Fetch `Sheet1.html`
2. Parse HTML table structure
3. Extract content from Column H of first data row
4. Clean image metadata using `cleanImageMetadata()`
5. Add cleaned article to stories array
6. Add option to dropdown menu

### Debugging Status
- ✅ HTML file exists and contains data
- ✅ Article extraction logic implemented
- ✅ Content cleaning functions created
- ⚠️ Function may be failing due to browser security (fetch() restrictions on local files)
- ⚠️ No error messages visible - need to check browser console

## Recent Fixes Applied

### Multi-word Selection Issue (FIXED)
**Problem**: When selecting multiple words via drag, translation wasn't appearing
**Solution**: 
- Removed redundant `updateSelectionUI()` call in `handleWordEnter()`
- Added global `document.addEventListener('mouseup', handleMouseUp)`
- Improved event flow for drag-to-select functionality
- Updated user feedback messages

### Code Changes Made
1. Enhanced mouse event handling for drag selection
2. Added better error logging for BBC article loading
3. Improved translation caching system
4. Fixed RTL/LTR text direction issues

## How to Resume Work

1. **Open the app**: Double-click `urdu-app-clean.html` or serve via local server
2. **Check browser console**: F12 → Console tab for any JavaScript errors
3. **Test current features**: Verify translation, vocabulary, navigation all work
4. **Debug BBC article**: Focus on why `loadBBCArticle()` isn't adding content to dropdown

## Next Steps

### Immediate Priority
1. **Fix BBC article dropdown**: Debug why article isn't appearing in story selection
2. **Check browser security**: Fetch() may be blocked for local files
3. **Alternative approaches**: Consider embedding data directly in JavaScript

### Potential Solutions
1. **Serve via HTTP server**: `python -m http.server 8000` in app directory
2. **Embed data directly**: Extract article content and put in JavaScript variable
3. **File protocol handling**: Add specific handling for `file://` protocol limitations

## Microsoft Translator API Details

- **Service**: Azure Cognitive Services Translator
- **Endpoint**: `https://api.cognitive.microsofttranslator.com/translate`
- **Version**: `api-version=3.0`
- **Translation**: `from=ur&to=en` (Urdu to English)
- **Authentication**: Subscription key in `Ocp-Apim-Subscription-Key` header
- **Region**: Specified in `Ocp-Apim-Subscription-Region` header

## Testing Checklist

When resuming, verify:
- [ ] Single word translation works (click any Urdu word)
- [ ] Multi-word translation works (drag across multiple words)
- [ ] Vocabulary saving works (save button after translation)
- [ ] Page navigation works (Previous/Next buttons)
- [ ] Full page translation toggle works
- [ ] Jump-to functionality works from saved vocabulary
- [ ] BBC article appears in dropdown (currently broken)
- [ ] Browser console shows no critical errors

## File Serving Requirements

For full functionality, serve the app via HTTP (not file://) due to:
- CORS restrictions on fetch() calls
- Local file access limitations in modern browsers
- Microsoft Translator API CORS proxy requirements

**Recommended**: `python -m http.server 8000` then visit `http://localhost:8000/urdu-app-clean.html`