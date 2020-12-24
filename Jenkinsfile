node {
  def app

  stage('Clone repository') {
      checkout scm
  }

  stage('Build Image') {
    sh "docker build -f Dockerfile -t dpim-web-image:${env.BUILD_NUMBER} ."
  }
  
  // stage('Remove Image From Local') {
  //   sh "docker rmi dpim-web-image:${currentBuild.previousBuild.getNumber()} -f"
  // }

  // stage('Remove Old Container from Local') {
  //   sh "docker rm dpim-web-${currentBuild.previousBuild.getNumber()} -f"
  // }

  stage('Start Container') {
    sh "docker run -d --expose 5000 -e NODE_ENV=production -e BUILD_NUMBER=${env.BUILD_NUMBER} -e VIRTUAL_HOST=dpimacademy.dpim.go.th,www.dpimacademy.dpim.go.th -e VIRTUAL_PORT=5000 --name dpim-web-${env.BUILD_NUMBER} dpim-web-image:${env.BUILD_NUMBER}"
  }
}
