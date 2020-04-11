export default class Player {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.started = false;
    }
    drawCategories(idx, categories) {
        this.categories = categories.slice(idx * 4, (idx + 1) * 4);
    }
    moveForward() {
        if (this.x === 0 && this.y > 0) { // First side: x=0, y=0-4
            this.y = this.y - 1;
        } else if (this.x < 5 && this.y === 0) { // Second side:x=0-4, y=0 
            this.x = this.x + 1;
        } else if (this.x === 5 && this.y < 5) { // Third side: x=5, y=0-4 
            this.y = this.y + 1;
        } else if (this.x > 0 && this.y === 5) { // Fourth side: x=5-1, y=5
            this.x = this.x - 1;
        } else {
            console.log("No move");
        }
        if (this.x === 5 && this.y === 5) {
            this.started = true;
        }
    }
    moveBackward() {
        console.log(this.x, this.y);
        if (this.x === 0 && this.y === 5) { // Start: x=0, y=5
            console.log("Cannot move backwards from START");
        } else if (this.x === 0 && this.y < 5) { // First side: x=0, y=0-4
            this.y = this.y + 1;
        } else if (this.x < 6 && this.y === 0) { // Second side:x=0-5, y=0 
            this.x = this.x - 1;
        } else if (this.x === 5 && this.y < 6) { // Third side: x=5, y=0-4 
            this.y = this.y - 1;
        } else if (this.x > 0 && this.y === 5) {
            this.x = this.x + 1;
        } else {
            console.log("No move");
        }
        if (this.x === 5 && this.y === 5) {
            this.started = true;
        }
    }
    isWinner() {
        return this.started && this.x === 0 && this.y === 5;
    }
}
