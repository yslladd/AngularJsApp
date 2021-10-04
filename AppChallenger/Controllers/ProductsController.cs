using AppChallenger.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AppChallenger.Controllers
{
    public class ProductsController : ApiController
    {
        public MongoClient _Db { get; set; }

        public ProductsController()
        {
            if (_Db == null)
            {
                _Db = new MongoClient(System.Configuration.ConfigurationManager.AppSettings["MongoDBConnection"]);
            }
        }

        // GET: api/Products
        public IEnumerable<Product> Get()
        {
            var products = _Db.GetDatabase("Daniel").GetCollection<Product>("Products").AsQueryable();
            return products;
        }

        // GET: api/Products/5
        public Product Get(string id)
        {
            string _id = System.Web.HttpUtility.UrlEncode(id);
            var product = _Db.GetDatabase("Daniel").GetCollection<Product>("Products").Find(p => p.ProductId == Convert.ToInt64(_id)).SingleAsync().Result;

            return product;
        }

        // POST: api/Products        
        public HttpResponseMessage Post([FromBody] Product product)
        {
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                //get id to increment
                var products = _Db.GetDatabase("Daniel").GetCollection<Product>("Products").AsQueryable().Count();
                product.ProductId = products + 1;

                _Db.GetDatabase("Daniel").GetCollection<Product>("Products").InsertOne(product);
            }
            catch (Exception)
            {
                statusCode = HttpStatusCode.BadRequest;
            }
            return Request.CreateResponse(statusCode, "Product created successfully!");
        }

        // PUT: api/Products/5
        public HttpResponseMessage Put([FromBody] Product product)
        {
            HttpStatusCode statusCode = HttpStatusCode.OK;
            try
            {
                var condition = Builders<Product>.Filter.Eq("ProductId", product.ProductId);

                var update = Builders<Product>.Update
                    .Set("Name", product.Name)
                    .Set("Sku", product.Sku)
                    .Set("Description", product.Description)
                    .Set("Price", product.Price);

                _Db.GetDatabase("Daniel").GetCollection<Product>("Products").UpdateOne(condition, update);
            }
            catch (Exception)
            {
                statusCode = HttpStatusCode.BadRequest;
            }
            return Request.CreateResponse(statusCode, "Product updated successfully!");
        }

        // DELETE: api/Products/5        
        public HttpResponseMessage Delete(string id)
        {
            HttpStatusCode statusCode = HttpStatusCode.OK;

            var condition = Builders<Product>.Filter.Eq("ProductId", System.Web.HttpUtility.UrlEncode(id));

            _Db.GetDatabase("Daniel").GetCollection<Product>("Products").DeleteOne(condition);

            return Request.CreateResponse(statusCode, "Product deleted successfully!");
        }
    }
}
