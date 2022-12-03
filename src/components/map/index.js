import { useCallback, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
/* eslint import/no-webpack-loader-syntax: off */
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
	require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
let map;
const Mapboxes = ({ currentLoc, setCurrentLoc }) => {
	let ref = useRef();

	mapboxgl.accessToken =
		'pk.eyJ1IjoiZ2FsaWhwZXJtYW5hMjkiLCJhIjoiY2xhZTZybzBhMGNwbDNxbzlxN284NzBvbCJ9.vW68KDX_nY_y6ynbkOaRUg';

	const fetchData = useCallback(
		async (end) => {
			const { data } = await axios.get(
				`https://api.mapbox.com/directions/v5/mapbox/cycling/${currentLoc[0]},${currentLoc[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=pk.eyJ1IjoiZ2FsaWhwZXJtYW5hMjkiLCJhIjoiY2xhZTZybzBhMGNwbDNxbzlxN284NzBvbCJ9.vW68KDX_nY_y6ynbkOaRUg`
			);

			const route = data?.routes[0].geometry.coordinates;
			const geojson = {
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'LineString',
					coordinates: route,
				},
			};
			if (map.getSource('route')) {
				map.getSource('route').setData(geojson);
			}
			// otherwise, we'll make a new request
			else {
				map.addLayer({
					id: 'route',
					type: 'line',
					source: {
						type: 'geojson',
						data: geojson,
					},
					layout: {
						'line-join': 'round',
						'line-cap': 'round',
					},
					paint: {
						'line-color': '#3887be',
						'line-width': 5,
						'line-opacity': 0.75,
					},
				});
			}
		},
		[currentLoc]
	);

	useEffect(() => {
		if (!ref.current) return;
		map = new mapboxgl.Map({
			container: ref.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 12,
		});

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			trackUserLocation: true,
		});

		map.addControl(geolocate);

		map.on('load', () => {
			geolocate.trigger();
			let coords = [];
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					coords = [position.coords.longitude, position.coords.latitude];

					// Add starting point to the map
					map.addLayer({
						id: 'pointing',
						type: 'circle',
						source: {
							type: 'geojson',
							data: {
								type: 'FeatureCollection',
								features: [
									{
										type: 'Feature',
										properties: {},
										geometry: {
											type: 'Point',
											coordinates: coords,
										},
									},
								],
							},
						},
						paint: {
							'circle-radius': 10,
							'circle-color': 'green',
						},
					});
				});
			}
			// make an initial directions request that
			// starts and ends at the same location

			// this is where the code from the next step will go
		});

		map.on('click', (event) => {
			const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
			const end = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'Point',
							coordinates: coords,
						},
					},
				],
			};
			if (map.getLayer('end')) {
				map.getSource('end').setData(end);
			} else {
				map.addLayer({
					id: 'end',
					type: 'circle',
					source: {
						type: 'geojson',
						data: {
							type: 'FeatureCollection',
							features: [
								{
									type: 'Feature',
									properties: {},
									geometry: {
										type: 'Point',
										coordinates: coords,
									},
								},
							],
						},
					},
					paint: {
						'circle-radius': 10,
						'circle-color': '#f30',
					},
				});
			}
			fetchData(coords);
		});
	}, [fetchData]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				let coords = [position.coords.longitude, position.coords.latitude];
				setCurrentLoc(coords);
				// fetchData(coords);
			});
		}
	}, []);

	return <div className="border-2 w-full h-screen" ref={ref}></div>;
};

export default Mapboxes;
