uniform vec3 uColor;
uniform float uMetalness;
uniform float uRoughness;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  
  float diffuse = max(dot(normal, lightDir), 0.0);
  float ambient = 0.3;
  
  float glow = sin(vPosition.y * 0.1 + uTime) * 0.5 + 0.5;
  vec3 finalColor = uColor * (ambient + diffuse * 0.7) + vec3(glow * 0.1);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
