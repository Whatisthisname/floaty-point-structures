/**
 * methods with prefixed with '_' work in-place
 */
class vec {

    constructor(x, y) {
        this.x = x
        this.y = y
        return this
    }

    neg() {
        return new vec(-this.x, -this.y)
    }

    add(vec1) {
        return new vec(vec1.x + this.x, vec1.y + this.y)
    }

    sub(vec1) {
        return this.add(vec1.neg())
    }

    dot(vec1) {
        return vec1.x * this.x + vec1.y * this.y
    }

    length() {
        return Math.sqrt(this.dot(this))
    }

    unit() {
        return this.scale(1.0 / this.length())
    }

    scale(scalar) {
        return new vec(this.x * scalar, this.y * scalar)
    }

    lerp (vec1, t = 0) {
        return this.scale(1-t).add(vec1.scale(t))
    }

    _neg() {
        this.x *= -1
        this.y *= -1
    }

    _add(vec1) {
        this.x += vec1.x
        this.y += vec1.y
    }

    _scale(scalar) {
        this.x *= scalar 
        this.y *= scalar
    }

    _lerp (vec1, t = 0) {
        this._scale(1-t)._add(vec1.scale(t))
    }

    _unit() {
        let length = this.length()
        this.x *= 1.0/length
        this.y *= 1.0/length
    }

}


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }