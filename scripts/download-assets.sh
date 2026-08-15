#!/usr/bin/env bash
# One-time asset pull from the live Framer site into /public.
# URLs verified live during site inspection (see dhruv-site-inventory.md).
set -uo pipefail
cd "$(dirname "$0")/.."

fetch() {
  local url="$1" dest="$2"
  if [ -s "$dest" ]; then
    echo "skip  $dest"
    return
  fi
  echo "fetch $dest"
  curl -sL --fail "$url" -o "$dest" || echo "FAILED $url -> $dest"
}

# --- branding / icons ---
fetch "https://framerusercontent.com/images/mE9bOZMP1yGz385RWq1tCcR65E.png" public/icons/logo-mark.png
fetch "https://framerusercontent.com/images/9OPeXxkE9REyzxIfVwfbhLP2CZs.png" public/favicon-source.png
fetch "https://framerusercontent.com/images/rfBNCuM68kitxBi18ll6B3E07cE.png" public/og/og-home-sidequest.png
fetch "https://framerusercontent.com/assets/p7dOdq9mZsfLmXjwO7ZReiwLAHE.png" public/og/og-projects-about-contact.png
fetch "https://framerusercontent.com/images/kEw1mnXoxbH5B6L1pZTKejD8.svg" public/icons/arrow-back.svg
fetch "https://framerusercontent.com/images/mOMvmtm0XcmfOgKwLByN9WrE.svg" public/icons/arrow-next.svg
fetch "https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" public/icons/decorative-mark-1.svg
fetch "https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg" public/icons/decorative-mark-2.svg

# --- project card thumbnails ---
fetch "https://framerusercontent.com/images/39b06irrx9RWWk2dFzCcdmkE38.png" public/img/projects/mahavitaran-thumb.png
fetch "https://framerusercontent.com/images/uCncNVBATIgeMvJouKPd0xrZI.png" public/img/projects/aria-thumb.png
fetch "https://framerusercontent.com/images/lRtRNYis30BxvUIIQ3On23pmQ.png" public/img/projects/mp4-thumb.png
fetch "https://framerusercontent.com/images/6Fq2YNGat5osl0xNA5EAZLPZa60.png" public/img/projects/frelo-thumb.png
fetch "https://framerusercontent.com/images/EZCuO7eH74KGmfycJ1GrutzHEqg.png" public/img/projects/next-project-teaser.png

# --- about ---
fetch "https://framerusercontent.com/images/0ISJkjuAQ3x8BPfl4YMWEGFoC0.png" public/img/about/home-preview-portrait.png
fetch "https://framerusercontent.com/images/WAGqtGckgU6nYGbn8dvffgzbxMU.png" public/img/about/vinyl-hero.png
fetch "https://framerusercontent.com/images/LhOu7XwBlEAY4kAr6DqHKtdfIc.png" public/img/about/portrait-halftone-blue.png
fetch "https://framerusercontent.com/images/yGiXWriRoctX0sOSxUN9jTLzlBM.jpg" public/img/about/layered-2.jpg
fetch "https://framerusercontent.com/assets/DE4Gsvvep3fIBH5Ku8skhZG2Ggs.mp3" public/audio/about-ambient.mp3

# --- client logos (4, confirmed live — NOT 7) ---
fetch "https://framerusercontent.com/images/kk8zYmVXaEfC6Ga5x2k0569Fid8.png" public/img/logos/logo-1.png
fetch "https://framerusercontent.com/images/s4xrhgdAerR3grlCjEcQi2znhw.png" public/img/logos/logo-2.png
fetch "https://framerusercontent.com/images/HOuITPGWtyTsr4x82FK56JqNpw0.png" public/img/logos/logo-3.png
fetch "https://framerusercontent.com/images/n1r1EPZkQEZ2cH1CmoBxZOTpmE.png" public/img/logos/logo-4.png

# --- testimonial avatars ---
fetch "https://framerusercontent.com/images/Xr9qdJbfKaqXLSE1DbuYuGqkVZc.png" public/img/testimonials/vaishakh-sajeevan.png
fetch "https://framerusercontent.com/images/NR4QcMMwaqIbyAwrs5kgEp6M.png" public/img/testimonials/nikhil-kulkarni.png
fetch "https://framerusercontent.com/images/Q46WTWel6lCkZJqQGb69wYb5dkA.jpeg" public/img/testimonials/rupak-shah.jpeg
fetch "https://framerusercontent.com/images/wJXAYKU19rySeXVcd7PYqCI691E.png" public/img/testimonials/ankit-savla.png

# --- videos ---
fetch "https://framerusercontent.com/assets/e7JC64h0GpjLec5UYLQYDWzI.mp4" public/video/hero.mp4
fetch "https://framerusercontent.com/assets/fQDCgOKLCUMbCDmfk4nheu7WTU.mp4" public/video/sidequest/reel-1.mp4
fetch "https://framerusercontent.com/assets/ivP5Tt3oW5vXJydaHZebGo9jOQA.mp4" public/video/sidequest/reel-2.mp4
fetch "https://framerusercontent.com/assets/PwBAQIMgnFUWtAG2s2Xc0XV3jkE.mp4" public/video/sidequest/reel-3.mp4
fetch "https://framerusercontent.com/assets/4ofO7HkYCL30QFqfAbWvl4Ko.mp4" public/video/sidequest/reel-4.mp4
fetch "https://framerusercontent.com/assets/8MhaL0ThWUVF9wxt5FUM4cC6Ck.mp4" public/video/sidequest/reel-5.mp4
fetch "https://framerusercontent.com/assets/paRUux4PmcXLCV9pO5p9qsN0uRU.mp4" public/video/sidequest/reel-6.mp4

# --- side quest photo strips (12 unique) ---
fetch "https://framerusercontent.com/assets/jZZzSEDq65c8GzLty3DfZFkJQ4.jpg" public/img/sidequest/strip1-1.jpg
fetch "https://framerusercontent.com/assets/SM8f3JhB0MAvhm2yT7sWnf2Rt8.jpg" public/img/sidequest/strip1-2.jpg
fetch "https://framerusercontent.com/assets/upa3EV0zNL0N0RGd7EkL7wVAU.jpg" public/img/sidequest/strip1-3.jpg
fetch "https://framerusercontent.com/assets/sQuywHXkfrah8Pt4YW8usm8S0.jpg" public/img/sidequest/strip1-4.jpg
fetch "https://framerusercontent.com/assets/DlAlIBZ6nbmBXd2LluJYEEwtfkU.png" public/img/sidequest/strip2-1.png
fetch "https://framerusercontent.com/assets/X7b1QPNn5udiLovjupcPv0KtFU.png" public/img/sidequest/strip2-2.png
fetch "https://framerusercontent.com/assets/1gdciAEGAuDBSnpk2OQSchL90t4.png" public/img/sidequest/strip2-3.png
fetch "https://framerusercontent.com/assets/RT8Ij60xm8zzSn3Mglhs3ZXKKQ.png" public/img/sidequest/strip2-4.png
fetch "https://framerusercontent.com/assets/w2CE0HKIOtBz9y8GmS3QwpTIDw.png" public/img/sidequest/strip3-1.png
fetch "https://framerusercontent.com/assets/HSbp8R6wweHN7jH54iQKHW4eWI.png" public/img/sidequest/strip3-2.png
fetch "https://framerusercontent.com/assets/TPTYlWr5KRhyiSZsWEVvpysBsI.png" public/img/sidequest/strip3-3.png
fetch "https://framerusercontent.com/assets/WxbFQNpO1rGgstBoPCvpPee73o.png" public/img/sidequest/strip3-4.png

# --- Mahavitaran gallery ---
D=public/img/projects/mahavitaran
i=1
for h in hDhzH95VmooR5KIEPrYTjzu7c8 CI9FLap9XR3aVzts5FRJdoY5HdI uqUR0X0uAcPy6Py1F9BKSL2BEr0 PYC9LIH7uVQ6pUNuP5rs3NsxYQo Ky45biLNyXJv2ecCYgBkVjU6eo Odfb1bJakw9NLLjw8l2Mt0nrY4 AlAeW3nz1kaQrAgq2bhxAkP9s PMzMIcveCyGwIMisjMpO7qnG8 Bxw6TNDAGU1IZcGu7TVt1tCt8 gnHDbPN8JMQVv9wxC34ZXn6zVSg dEDpPtOZ5ik6x7mISK4ApLqg7g FmCagwm0ffWEUAKhkP1w4rdunY ifPPWeRLFN5ngsfzDzcDJ2ZvMmw 7tO3bkKOvAs9cgp4vvaWerazKU; do
  fetch "https://framerusercontent.com/images/${h}.png" "$D/gallery-$(printf '%02d' $i).png"
  i=$((i+1))
done

# --- Aria gallery ---
D=public/img/projects/aria
i=1
for h in wxdJaqoXC1ovtCtPdfcetLFnAuY mCIGBiHPdk7a7jdejlYlZ4a8 TRCMV6R0fC1yKk7vzs8kOdEWZ5E WFc0kGN1LdG0Vh6RnG5BIgF6X80 8uVyZxdh0ALE8NrJjXnsr1NXA xex26sLG76aUxXXxdztb7SLQ QFctPul1zT3KDYqJB2mx8mAVnVU mitJDbaT1CiHPVEyNKFX2K100w GRUbA1WtKTdlvqUsV3O0KnZoPYw v5VH45hqY3EEDzR0TJtPi4wRGts 1rvv564mlfmMRrLk8tHsI uauNdaI9it33yUMsB7HuvrOvuuY mUxn2aFijlEP71KZOmX679xFD2s nuApL8SMxOSv3iv6QVcWTlqVp4 P03s4JdGRCUnyy3xtz99si5iNK0 AiOn92XV4eepURPVKMdAQ8sPbQ i5gTBscvnBYZ4XN2fk9rr5qPM iKJIbDtNFpivQ1ys6vOy3wFwlsw GDzgmTR2Kb7ba7cxUnIxQQiTWj4 EGdEjlja0ywA28UVGo5pMMddPxg T7odPVhXl9ORn6YrHrtoBKXFQ1I; do
  fetch "https://framerusercontent.com/images/${h}.png" "$D/gallery-$(printf '%02d' $i).png"
  i=$((i+1))
done

# --- Mp4 Productions gallery ---
D=public/img/projects/mp4
i=1
for h in tTzqw0FosB6RyCrkiMWmI2WORoY xczAJe56QFiIcS8XIO9ZXBm2Mc b56GPq8yOA4k3lHZyDCeJYg1VUM Q2B1lmkJi46mMCd8e8gluouXvcA ysDUIUW5tKYZuArkqLpp5x3Fi8M; do
  fetch "https://framerusercontent.com/images/${h}.png" "$D/gallery-$(printf '%02d' $i).png"
  i=$((i+1))
done

# --- Frelo gallery ---
D=public/img/projects/frelo
i=1
for h in 04tXA593FhsZN0PE1SNKDvSpPs v4I9UIvz6txlYdY8YAVJkMF4hg DSrviaouiMtgO12rZr7S01HtA Jw1PPzkqzn41eegn68g8BWgbG90 7zewh0pHUrrvjgB3bJQsZ0F5RHw; do
  fetch "https://framerusercontent.com/images/${h}.png" "$D/gallery-$(printf '%02d' $i).png"
  i=$((i+1))
done

echo "Done."
