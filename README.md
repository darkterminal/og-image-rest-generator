
![Sample Image Generator](https://og-image-rest-generator.fly.dev/seo-banner?title=OG:IMAGE%20REST%20Generator%20-%20Free%20And%20Open%20Source!&author=darkterminal&head=Baby%20Tyrex%20Release&writer=Punk%20Storyteller)
# OG:IMAGE REST Generator

**OG:IMAGE REST Generator** is a free and powerful tool that simplifies the process of generating Open Graph images for your website or application. With our RESTful API, you can quickly and easily create customized images that will make your content stand out on social media platforms like Facebook, Twitter, and LinkedIn.


[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

## API Reference

#### Generate Simple Image (with gradient background)

```http
POST /generate
Content-Type: application/json
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `canonicalName` | `string` | this is the name we'll use to save our image (slugify first: Recomended!) |
| `gradientColors` | `array` | an array of two colors, i.e. `[ '#ffffff', '#000000' ]`, used for our gradient |
| `articleName` | `string` | the title of the article or site you want to appear in the image |
| `articleCategory` | `string` | the category which that article sits in - or the subtext of the article |
| `emoji` | `string` | the emoji you want to appear in the image. |

**Example**
```curl
curl -X POST \
  'https://<base-url>/generator' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "canonicalName": "metaphor-website-live",
  "articleName": "Metaphor Website Live",
  "gradientColors": ["#fc00ff","#00dbde"],
  "articleCategory": "open-sorce",
  "emoji": "🎉"
}'
```

**Result**:

```json
{
    "message": "Image generated!",
    "image": "data:image/png;base64,y12msd..."
}
```

**Sample Image**:
![Legacy Generator](images/create-banner-image-from-grithub-action.png)

#### Classic SEO Banner

```http
GET /classic-seo-banner
```

| Query     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `articleName` | `string` | the title of the article or site you want to appear in the image |
| `author` | `string` | the name of author |
| `language` | `string` | the category of programming language |

Result: `image/png`

**Sampe Image**:
![Legacy Generator](images/classic-seo-banner.png)

#### SEO Banner (New)

```http
GET /seo-banner
```

| Query     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | the title of the article or site you want to appear in the image |
| `author` | `string` | the name of author |
| `logo` | `string` | the logo of your app / web |
| `head` | `string` | title legend |
| `writer` | `string` | author legend |

Result: `image/png`

**Sample Image**:
![Legacy Generator](images/seo-banner.png)
