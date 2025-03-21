"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import Form from "next/form";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] flex items-center justify-center text-gray-500 p-10">
        Carregando editor...
      </div>
    ),
  }
);

export default function Page() {
  const [solucao, setSolucao] = useState("");
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    setSolucao(content);
  };

  const handleSubmit = (formData: FormData) => {};

  return (
    <div className="py-10 px-5 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Todas as Dicas</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle /> Nova Dica
          </Button>
        </DialogTrigger>

        <DialogContent
          className="h-5/6 w-full max-w-6xl overflow-hidden"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "black transparent", 
            overflowY: "auto",
          }}
        >
          <DialogTitle className="font-bold">Nova Dica</DialogTitle>

          <div className="max-h-[80vh] overflow-y-auto p-4 mt-3">
            <Form action={handleSubmit}>
              <div className="mb-3">
                <Label htmlFor="titulo" className="mb-1">
                  Título da Dica:
                </Label>
                <Input
                  type="text"
                  id="titulo"
                  name="titulo"
                  placeholder="Erro de SCRIPT 18181..."
                />
              </div>
              <div className="mb-3">
                <Label className="mb-1" htmlFor="solucao">
                  Solução:
                </Label>
                <div className="max-h-[500px] overflow-y-auto border rounded p-2">
                  <Editor
                    apiKey="1xncjp6ftmlmfrylsguwag7884pouij37b0tl4mxg7svqjoa"
                    id="solucao"
                    value={solucao}
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: ["lists", "link"],
                      toolbar:
                        "undo redo | bold italic | bullist numlist outdent indent | link",
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              </div>
              <div className="text-end pt-3">
                <Button type="submit">Cadastrar Dica</Button>
              </div>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
