using desafio_tcit2.Data;
using desafio_tcit2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace desafio_tcit2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SegurosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SegurosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/seguros
        [HttpGet("GetSeguros")]
        public async Task<ActionResult<List<Seguro>>> GetSeguros()
        {
            List<Seguro> seguros = await _context.Seguros.ToListAsync();
            return seguros;
        }

        // GET: api/seguros/5
        [HttpGet("GetSeguro")]
        public async Task<ActionResult<Seguro>> GetSeguro(int id)
        {
            Seguro? seguro = await _context.Seguros.FindAsync(id);

            if (seguro == null)
            {
                return NotFound();
            }

            return seguro;
        }

        // POST: api/seguros
        [HttpPost("CreateSeguro")]
        public async Task<ActionResult<Seguro>> CreateSeguro(Seguro seguro)
        {
            _context.Seguros.Add(seguro);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSeguro), new { id = seguro.Id }, seguro);
        }

        [HttpPost("DeleteSeguro")]
        public async Task<IActionResult> DeleteSeguro([FromBody] int id)
        {
            Seguro? seguro = await _context.Seguros.FindAsync(id);
            if (seguro == null)
            {
                return NotFound();
            }

            _context.Seguros.Remove(seguro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeguroExists(int id)
        {
            return _context.Seguros.Any(e => e.Id == id);
        }
    }

}