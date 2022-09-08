import { keyframes } from '@emotion/react';

class BunnyHelper {
  static #JUMP_ANGLE = 30; // deg

  static #JUMP_HEIGHT = '25vw';

  static #PATH_SHOWING = {
    nothing:
      'polygon(0 0, 0 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 0 0, 0 0, 0 0)',
    little:
      'polygon(18% 10%, 30% 0, 64% 0, 85% 0%, 100% 0, 100% 15%, 100% 27%, 91% 38%, 72% 44%, 46% 39%, 33% 31%, 21% 24%)', // frame [1]
    everything:
      'polygon(0 0, 0 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 100%, 79% 100%, 1% 100%, 0 100%)',
  };

  #holeSize;

  #selectedHole;

  #bunnyPos;

  #holePositions;

  #godMode;

  constructor(holeSize, selectedHole, bunnyPos, holePositions, godMode) {
    this.#holeSize = holeSize;
    this.#selectedHole = selectedHole;
    this.#bunnyPos = bunnyPos;
    this.#holePositions = holePositions;
    this.#godMode = godMode;
  }

  get #oldHolePos() {
    return this.#holePositions[this.#bunnyPos.prev] || { x: null, y: null };
  }

  get #currHolePos() {
    return this.#holePositions[this.#bunnyPos.curr] || { x: null, y: null };
  }

  get #jumpDirection() {
    return this.#currHolePos.x > this.#oldHolePos.x ? 'right' : 'left';
  }

  get #rotateAngle() {
    return this.#jumpDirection === 'right'
      ? this.constructor.#JUMP_ANGLE
      : -this.constructor.#JUMP_ANGLE;
  }

  get #isJumpingIntoSelectedHole() {
    return this.#selectedHole === this.#bunnyPos.curr;
  }

  get #top() {
    return {
      '0%': `${this.#oldHolePos.y}px`,
      '50%': `calc(${this.#oldHolePos.y}px - ${this.constructor.#JUMP_HEIGHT})`,
      '100%': this.#endingTop,
    };
  }

  get #left() {
    return {
      '0%': `${this.#oldHolePos.x}px`,
      '100%': `${this.#currHolePos.x}px`,
    };
  }

  get #transform() {
    return {
      '0%': 'translateX(-50%) rotateX(0deg)',
      '5%': `translateX(-50%) rotate(${this.#rotateAngle}deg)`,
      '95%': `translateX(-50%) rotate(${-this.#rotateAngle}deg)`,
      '100%': `translateX(-50%) rotate(${this.#endRotation})`,
    };
  }

  get #clipPaths() {
    return {
      '0%': this.constructor.#PATH_SHOWING.nothing,
      '15%': this.constructor.#PATH_SHOWING.little,
      '30%': this.constructor.#PATH_SHOWING.everything,
      '85%': this.constructor.#PATH_SHOWING.everything,
      '95%': this.#isJumpingIntoSelectedHole
        ? this.constructor.#PATH_SHOWING.everything
        : this.constructor.#PATH_SHOWING.little,
      '100%': this.#isJumpingIntoSelectedHole
        ? this.constructor.#PATH_SHOWING.everything
        : this.constructor.#PATH_SHOWING.nothing,
    };
  }

  get #transformOrigin() {
    return {
      '100%': `${this.#endTransformOrigin}`,
    };
  }

  /* END VALUES */
  get #endingTop() {
    let val = `${this.#currHolePos.y}px`;
    if (this.#isJumpingIntoSelectedHole)
      val = `calc(${val} - ${this.#holeSize})`;
    return val;
  }

  get #endTransformOrigin() {
    if (!this.#isJumpingIntoSelectedHole) return 'top';
    if (this.#jumpDirection === 'right') return '60% 70%';
    /* else if jumping left */ return '40% 60%';
  }

  get #endRotation() {
    if (!this.#isJumpingIntoSelectedHole) return '0deg';
    if (this.#jumpDirection === 'right') return '-90deg';
    /* else if jumping left */ return '90deg';
  }

  /* 👇 PUBLIC METHODS 👇 */
  get jumpOpacity() {
    return this.#godMode || this.#isJumpingIntoSelectedHole ? '1' : '0';
  }

  get jumpingAnimation() {
    return keyframes`
    from{
      top: ${this.#top['0%']};
      left: ${this.#left['0%']};
      transform: ${this.#transform['0%']};
      clip-path: ${this.#clipPaths['0%']};
    }
    5%{
      transform: ${this.#transform['5%']};
    }
    15%{
      clip-path: ${this.#clipPaths['15%']};
    }
    30%{
      clip-path: ${this.#clipPaths['30%']};
    }
    50%{
      top: ${this.#top['50%']};
    }
    85%{
      clip-path: ${this.#clipPaths['85%']};
    }
    95%{
      transform: ${this.#transform['95%']};
      clip-path: ${this.#clipPaths['95%']};
    }
    to{
      top: ${this.#top['100%']};
      left: ${this.#left['100%']};
      transform-origin: ${this.#transformOrigin['100%']};
      transform: ${this.#transform['100%']};
      clip-path: ${this.#clipPaths['100%']};
    }
  `;
  }
}

export default BunnyHelper;
