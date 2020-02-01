# pi-home-server

## DHT11 Based Humidity and Temperature Server

### Build Container Image

```
$ docker build -t khubo/pi-dht11:latest .
```

### Kubernetes Deployment

Deploy in a k8s cluster:
```
$ kuberctl apply -f pod.yaml
pod/pi-dht11 created

$ kubectl get pods
NAME         READY   STATUS    RESTARTS   AGE
pi-dht11     1/1     Running   0          9s
```

Access the results via port-forward:
```
$ kubectl port-forward pods/pi-dht11 3000:3000
...
...

$ curl localhost:3000
{"temp":24,"humidity":57}
```
