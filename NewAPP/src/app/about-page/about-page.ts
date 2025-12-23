import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate, splitText, stagger, random } from 'animejs';

@Component({
  selector: 'app-about-page',
  standalone: true,
  templateUrl: './about-page.html',
  styleUrls: ['./about-page.css']
})
export class AboutPage implements OnInit {

  ngOnInit(): void {
    // Existing animations
    const split = splitText('p');

    animate(split.words, {
      opacity: () => random(0, 1, 2),
      delay: stagger(50),
    });

    const { chars } = splitText('h2', { words: false, chars: true });

    animate(chars, {
      y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      rotate: {
        from: '-1turn',
        delay: 0
      },
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true
    });

    animate(['feTurbulence', 'feDisplacementMap'], {
      baseFrequency: 0.05,
      scale: 15,
      alternate: true,
      loop: true
    });

    animate('polygon', {
      points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
      alternate: true,
      loop: true
    });

    if (isPlatformBrowser(PLATFORM_ID)) {
      const text2Spans = document.querySelectorAll('.text2 span');
      if (text2Spans.length) {

        // Timeline-like stagger animation using the existing API
        const delayFn = stagger(20);
        const randomFn = (min: number, max: number) => Math.random() * (max - min) + min;

        const scatterAndReassemble = () => {
          // Scatter
          animate(text2Spans, {
            translateX: () => randomFn(-500, 500),
            translateY: () => randomFn(-500, 500),
            rotate: () => randomFn(-360, 360),
            duration: 5000,
            delay: delayFn,
            easing: 'easeInOutExpo',
            complete: () => {
              // Reassemble after scatter finishes
              animate(text2Spans, {
                translateX: 0,
                translateY: 0,
                rotate: 0,
                duration: 5000,
                delay: delayFn,
                easing: 'easeInOutExpo',
                complete: scatterAndReassemble // loop
              });
            }
          });
        };

        scatterAndReassemble(); // start the loop
      }
    }
  }
}
