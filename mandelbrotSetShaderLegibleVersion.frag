precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

/* 
Function that checks if x0 and y0 values of
one pixel falls inside the mandelbrot figure.
*/
bool isInside(float x0,float y0){
    float x = 0.0;
    float y = 0.0;
    // 500 iterations of accuracy.
    // If the point is still inside after finishing the for loop we consider is inside of the figure.
    for(int i = 0; i < 500; i++) {
        if(x * x + y * y > 4.0) return false; // Falls outside.
        // Calculate the next x and y as in mandelbrot formule.
        float xN= x * x - y * y + x0;
        float yN= 2.0 * x * y + y0;
        x=xN;
        y=yN;
    }
    return true; // Falls inside.
}

void main(){
    // Set zoom between 1.0 and 0.00005 in function of time.
    float minZoom = 0.00005;
    float maxZoom = 1.0;
    float zoom = maxZoom * pow(minZoom / maxZoom, 0.5 + 0.5 * sin(u_time * 0.1));
    
    // Point to approach.
    vec2 target = vec2(0.2304, 0.52);
    
    // [xMin, xMax] range and [yMin, yMax] range of the fractal we are drawing.
    vec2 rangeX = vec2(target.x - (target.x - 0.1) * zoom, target.x + (1.0 - target.x) * zoom);
    vec2 rangeY = vec2(target.y - (target.y - 0.1) * zoom, target.y + (1.0 - target.y) * zoom);
    
    // Normalize the pixel coordinates to fit inside the range we are representing.
    float x0 = rangeX.x + (gl_FragCoord.x / u_resolution.x) * (rangeX.x - rangeX.y); 
    float y0 = rangeY.y - (gl_FragCoord.y / u_resolution.y) * (rangeY.t - rangeY.x);
    
    // Check if the current pixel is inside of the mandelbrot figure. 
    if(isInside(x0, y0)){
        gl_FragColor = vec4(0,0,0,1); // Black if inside.
    } else {
        gl_FragColor = vec4(0,0,1,1); // Blue if outside.
    }
}