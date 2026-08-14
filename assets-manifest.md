# Asset Manifest
Every media URL recovered from the rendered pages, organized by page and section. These are your own files — pull them directly and drop them into `/public` in the new project.

Framer serves images through a resizing endpoint. Strip the `?width=…&height=…` query string to get the original at full resolution.

---

## Suggested `/public` structure
```
public/
  video/
    hero.mp4
    sidequest/          (6 reels)
  audio/
    about-ambient.mp3
  img/
    about/              (4)
    projects/           (4 — see gap note)
    testimonials/       (4 avatars)
    logos/              (7 client logos)
    sidequest/          (12 across 3 strips)
  icons/                (arrows, decorative marks)
  og/                   (2 social share images)
```

---

## Home

### Hero
| Asset | URL |
|---|---|
| Hero background loop | `https://framerusercontent.com/assets/e7JC64h0GpjLec5UYLQYDWzI.mp4` |

### About section
| Asset | URL |
|---|---|
| Ambient audio track | `https://framerusercontent.com/assets/DE4Gsvvep3fIBH5Ku8skhZG2Ggs.mp3` |
| Layered image 1 | `https://framerusercontent.com/images/WAGqtGckgU6nYGbn8dvffgzbxMU.png` |
| Layered image 2 | `https://framerusercontent.com/images/yGiXWriRoctX0sOSxUN9jTLzlBM.jpg` |
| Portrait — alt: "About Image of Designer" | `https://framerusercontent.com/images/0ISJkjuAQ3x8BPfl4YMWEGFoC0.png` |

### Client logo strip (7)
```
https://framerusercontent.com/images/n1r1EPZkQEZ2cH1CmoBxZOTpmE.png
https://framerusercontent.com/images/mATvNJue81DSqd8xO19ke3cCYo.png
https://framerusercontent.com/images/5qS8GpW1RYvTB3u5JcTpEYpR1Ik.png
https://framerusercontent.com/images/Mom8SZZGPDQlFU8SVMgiHMlcelU.png
https://framerusercontent.com/images/kk8zYmVXaEfC6Ga5x2k0569Fid8.png
https://framerusercontent.com/images/s4xrhgdAerR3grlCjEcQi2znhw.png
https://framerusercontent.com/images/HOuITPGWtyTsr4x82FK56JqNpw0.png
```

### Testimonial avatars (4)
| Person | URL |
|---|---|
| Vaishakh Sajeevan — Founder, Frelo | `https://framerusercontent.com/images/Xr9qdJbfKaqXLSE1DbuYuGqkVZc.png` |
| Nikhil Kulkarni — Founder, Docville | `https://framerusercontent.com/images/NR4QcMMwaqIbyAwrs5kgEp6M.png` |
| Rupak Shah — Co-founder, AiVANTA | `https://framerusercontent.com/images/Q46WTWel6lCkZJqQGb69wYb5dkA.jpeg` |
| Ankit Savla — Founder, OPE Innovation Lab | `https://framerusercontent.com/images/wJXAYKU19rySeXVcd7PYqCI691E.png` |

### Icons
| Asset | URL |
|---|---|
| Carousel back arrow | `https://framerusercontent.com/images/kEw1mnXoxbH5B6L1pZTKejD8.svg` |
| Carousel next arrow | `https://framerusercontent.com/images/mOMvmtm0XcmfOgKwLByN9WrE.svg` |
| Decorative mark 1 | `https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg` |
| Decorative mark 2 | `https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg` |

> **Gap — project card images.** The four featured project thumbnails didn't come through in the rendered output. Alt text was recoverable: Mahavitaran → "Serene Portrait flowers", Aria → "avant garde portrait", Mp4 Productions → "red hat portrait", Frelo → "Elegant red portrait". Source these from your originals.

---

## About page
| Asset | URL |
|---|---|
| Hero image (1920×1080) — alt: "About Image of Designer" | `https://framerusercontent.com/images/LhOu7XwBlEAY4kAr6DqHKtdfIc.png` |

Reuses the ambient audio and both layered images from the home About section.

---

## Sidequest

### Video reels (6)
```
https://framerusercontent.com/assets/fQDCgOKLCUMbCDmfk4nheu7WTU.mp4
https://framerusercontent.com/assets/ivP5Tt3oW5vXJydaHZebGo9jOQA.mp4
https://framerusercontent.com/assets/PwBAQIMgnFUWtAG2s2Xc0XV3jkE.mp4
https://framerusercontent.com/assets/4ofO7HkYCL30QFqfAbWvl4Ko.mp4
https://framerusercontent.com/assets/8MhaL0ThWUVF9wxt5FUM4cC6Ck.mp4
https://framerusercontent.com/assets/paRUux4PmcXLCV9pO5p9qsN0uRU.mp4
```

### Photo strip 1 — 4 unique frames (JPG)
```
https://framerusercontent.com/assets/jZZzSEDq65c8GzLty3DfZFkJQ4.jpg
https://framerusercontent.com/assets/SM8f3JhB0MAvhm2yT7sWnf2Rt8.jpg
https://framerusercontent.com/assets/upa3EV0zNL0N0RGd7EkL7wVAU.jpg
https://framerusercontent.com/assets/sQuywHXkfrah8Pt4YW8usm8S0.jpg
```

### Photo strip 2 — 4 unique frames (PNG)
```
https://framerusercontent.com/assets/DlAlIBZ6nbmBXd2LluJYEEwtfkU.png
https://framerusercontent.com/assets/X7b1QPNn5udiLovjupcPv0KtFU.png
https://framerusercontent.com/assets/1gdciAEGAuDBSnpk2OQSchL90t4.png
https://framerusercontent.com/assets/RT8Ij60xm8zzSn3Mglhs3ZXKKQ.png
```

### Photo strip 3 — 4 unique frames (PNG)
```
https://framerusercontent.com/assets/w2CE0HKIOtBz9y8GmS3QwpTIDw.png
https://framerusercontent.com/assets/HSbp8R6wweHN7jH54iQKHW4eWI.png
https://framerusercontent.com/assets/TPTYlWr5KRhyiSZsWEVvpysBsI.png
https://framerusercontent.com/assets/WxbFQNpO1rGgstBoPCvpPee73o.png
```

> Each strip lists 7 slots in the DOM, but only 4 are unique — the rest repeat to create the seamless loop. The `<Marquee>` component handles that duplication, so only store the 4 originals per strip.

---

## Social share images
| Page | URL |
|---|---|
| Home, Sidequest | `https://framerusercontent.com/images/rfBNCuM68kitxBi18ll6B3E07cE.png` |
| Projects, About, Contact | `https://framerusercontent.com/assets/p7dOdq9mZsfLmXjwO7ZReiwLAHE.png` |

---

## Totals
- 7 videos (1 hero + 6 Sidequest)
- 1 audio track
- 4 About images, 7 client logos, 4 testimonial avatars, 12 Sidequest frames
- 4 SVG icons, 2 OG images
- **Outstanding:** 4 project card thumbnails

---

## Bulk download
Save the URLs above into `urls.txt`, then:

```bash
wget -i urls.txt -P ./downloads --content-disposition
```

Or with curl, preserving the Framer hash as the filename:

```bash
while read url; do curl -O "$url"; done < urls.txt
```

Rename to something human-readable as you sort them into the structure above — the Framer hashes are meaningless in the new project, and readable filenames make the components far easier to follow.
