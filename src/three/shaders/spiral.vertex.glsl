uniform float uMorphProgress;
uniform float uTime;
uniform float uStartRadius;
uniform float uEndRadius;
uniform float uHeight;

varying vec3 vPosition;
varying vec3 vNormal;

vec3 helixPosition(vec3 pos) {
  float t = pos.y / uHeight;
  float radius = mix(uStartRadius, uEndRadius, t);
  float angle = t * 8.0 * 3.14159265359;
  
  return vec3(
    radius * cos(angle),
    pos.y,
    radius * sin(angle)
  );
}

vec3 organicPosition(vec3 pos) {
  float t = pos.y / uHeight;
  float radius = mix(uStartRadius, uEndRadius, t);
  float angle = t * 8.0 * 3.14159265359;
  
  float organicOffset = sin(t * 10.0 + uTime * 0.5) * 0.3;
  float radiusVariation = 1.0 + sin(t * 15.0 + uTime) * 0.15;
  
  return vec3(
    radius * radiusVariation * cos(angle + organicOffset),
    pos.y,
    radius * radiusVariation * sin(angle + organicOffset)
  );
}

void main() {
  vec3 helixPos = helixPosition(position);
  vec3 organicPos = organicPosition(position);
  vec3 finalPosition = mix(helixPos, organicPos, uMorphProgress);
  
  vPosition = finalPosition;
  vNormal = normal;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
}
