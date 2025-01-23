import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/wp-json/wp/v2";

const EditForm = ({ slug }) => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    featuredImage: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostData = async () => {
    try {
      const response = await fetch(`${API_BASE}/posts?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do post");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("Post não encontrado");
      }

      const post = data[0]; // O primeiro item da lista corresponde ao slug

      setPostData({
        title: post.title.rendered || "",
        content: post.content.rendered || "",
        featuredImage: post.featured_media || "",
        status: post.status || "draft",
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPostData();
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/posts?slug=${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          featured_media: postData.featuredImage,
          status: postData.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar as alterações");
      }

      alert("Post atualizado com sucesso!");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input type="text" id="title" name="title" value={postData.title} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="content">Conteúdo</label>
        <textarea id="content" name="content" value={postData.content} onChange={handleInputChange} />
      </div>

      <div>
        <label htmlFor="featuredImage">Imagem Destacada</label>
        <input
          type="file"
          id="featuredImage"
          name="featuredImage"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Imagem Destacada</label>
        {postData.featuredImage ? (
          <div>
            <img
              src={postData.featuredImage}
              alt="Imagem destacada"
              style={{ width: "100px", height: "auto" }}
            />
          </div>
        ) : (
          <p>Nenhuma imagem destacada</p>
        )}
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={postData.status} onChange={handleInputChange}>
          <option value="publish">Publicado</option>
          <option value="draft">Rascunho</option>
          <option value="pending">Pendente</option>
        </select>
      </div>

      <button type="submit">Salvar Alterações</button>
    </form>
  );
};

export default EditForm;
