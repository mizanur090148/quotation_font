import axios from 'axios'

export default axios.create({
	baseURL: 'http://quotation-dev/api'
});